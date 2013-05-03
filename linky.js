var code_js = function(){
  var styles = ['<style>',
		'#aji-info-panel { position: fixed;border: 1px solid #ccc;background-color: white;width: 80%;height: 70%;top: 0;margin-left: 10%;padding: 5px; }',
		'.aj-scroll-container { overflow-y: scroll; height: 98%; width: 100%;}',
		'#aji-info-panel table { width: 100%;}',
		'.aj-url { word-break: break-all }',
		'.aj-name { cursor: pointer }',
		'.aj-name:hover { color:red; }',
		'.aj-even { background-color: #eeeefa}',
		'#aj-drawer { cursor: pointer; margin: 0 auto; }',
		'#aj-drawer:hover { color: red; }',
		'#aj-drawer .close{ display:inline}',
		'#aj-drawer .open{ display:none}',
		'#aj-drawer.closed  .close{ display:none !important;}',
		'#aj-drawer.closed  .open{ display:inline !important}',
		'.aj-ok { color: green}',
		'.aj-bad { color: orange}',
		'.aj-highlight { background-color: yellow; }',
	'</style>'].join('\n');
	var table = ['<div id="aji-info-panel">','<div class="aj-scroll-container">','<table>'];
	table.push('<tr><th>#</th><th>Link Text</th><th>Url</th><th>Link Check</th><th>Title Text</th></tr>');

	var allLinks = $('#middle-column').length > 0 ? $('#middle-column a'):$('a');

	allLinks.each(function(i,x){
		table.push(['<tr class="', i%2 == 0?'aj-even': 'aj-odd' ,'" data-index="',i,'">',
		'<td width="2%">', i+1,'</td>',
		'<td class="aj-name">',$(this).text(),'</td>',
		'<td class="aj-url">',$(this).attr('href'),'</td>',
		'<td id="aj-url-status-',i,'">','','</td>',
		'<td>',$(this).attr('title'),'</td>',
		'</tr>'].join(''));
    var index = i; 
    /*$.ajax({
        type: "HEAD",
        async: true,
        url: x.href,
        success: function(message,status,response){
            if(status = 'success')
            	$('#aj-url-status-'+index).html('<span class="aj-ok">OK</span>');
            else
            	$('#aj-url-status-'+index).html('<span class="aj-bad">'+status+'</span>');
        }
    });*/
	});

	table.push('</table></div>');
	table.push('<div id="aj-drawer"><span class="close">Close</span><span class="open">Open</span></div>')
	table.push('</div>');
	$(styles).appendTo('body');
	$(table.join('')).appendTo('body');

	$('#aj-drawer').click(function(){
		var sc = $('.aj-scroll-container');
		if(sc.hasClass('js-closed')) {
			sc.show();
			sc.parent().css('height', '70%');
			sc.removeClass('js-closed');
		}
		else{
			sc.hide();
			sc.parent().css('height', '20px');
			sc.addClass('js-closed');
		}
		$('#aj-drawer').toggleClass('closed');
	});


	$('.aj-name').click(function(){
		var index = parseInt($(this).parent().data('index'));
		var el = $(allLinks[index]);
		$('html, body').animate({
			scrollTop: el.offset().top - 40
		}, 2000);
		$('.aj-highlight').removeClass('aj-highlight');
		$('#aj-drawer').click();
		$(el).addClass('aj-highlight');
	});
};

var s=document.createElement('script');s.setAttribute('src','//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js')
s.onload = code_js;
document.getElementsByTagName('head')[0].appendChild(s);
