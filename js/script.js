function exConvert(name, color, csscolor) {
    var elm = document.getElementById(name);
    elm.innerHTML = '0x' + color;
    //elm.style.backgroundColor = '#' + csscolor;
    //elm.style.color = oppositeColor(csscolor, -1);
    //var hsv = RGBtoHSV(parseColorCode(csscolor));
    //elm.style.color = InvertColor(csscolor);
    //ChangeColorCodeBack();
}

function isColorElementColorTrans(name){
    var elm = document.getElementsByName(name)[0];
    var value = elm.value;
    if(value.match(/00[a-f0-9]{6}/gi))
        return true;
    return false;
}

function InputFileChange(files) {
    if (files.length == 0) return;
    console.log("file changed");
    const reader = new FileReader();
    reader.onload = function fileReadComplete() {
        var ctx = reader.result;
        var y = YAML.parse(ctx.replace(/(0x[0-9a-fA-F]+)/g, '"$1"'));
        var jo = JSON.parse(JSON.stringify(y));
        {
            var schema = Object.keys(jo)[0].split('/')[Object.keys(jo)[0].split('/').length - 1];
            document.getElementById('schema').innerText = schema;
            document.getElementsByName('schema')[0].value = schema;
        }
        var keyso = jo[Object.keys(jo)[0]];
        if (keyso['name'] != undefined){
            document.getElementById('name').innerText = keyso['name'];
            document.getElementsByName('name')[0].value = keyso['name'];
        }
        if (keyso['author'] != undefined){
            document.getElementById('author').innerText = keyso['author'];
            document.getElementsByName('author')[0].value = keyso['author'];
        }
        var colors  = [
            'back_color', 'border_color', 'shadow_color', 'text_color', 'hilited_text_color', 'hilited_back_color', 'hilited_shadow_color', 
			'hilited_mark_color', 'hilited_label_color', 'hilited_candidate_text_color', 'hilited_comment_text_color',
			'hilited_candidate_back_color', 'hilited_candidate_shadow_color', 'hilited_candidate_border_color',
			'label_color', 'candidate_text_color', 'comment_text_color', 'candidate_back_color', 'candidate_shadow_color', 'candidate_border_color',
			'prevpage_color', 'nextpage_color'
        ];
		colors.forEach(function(color){
        if (keyso[color] != undefined){
            document.getElementsByName(color)[0].value = keyso[color].toUpperCase().substr(2);
            document.getElementsByName(color)[0].onchange();
        }
        })
    };
    reader.readAsText(files[0]);
}

function ChangeColorCodeBack(){
    var src = document.getElementById('source_code');
    var colors = src.getElementsByClassName('color');
    for(var i=0; i < colors.length; i++)
    {
        var color = colors[i].innerHTML.slice(2);
        colors[i].style.backgroundColor = '#' + convertABGR2RGBA(color);
        colors[i].style.color = InvertColor(convertABGR2RGBA(color));
    }
}
function oppositeColor(a, ilighten){
    if(a.length > 6)    a.slice(2);
    var max16= Math.floor(15+(ilighten||0));
    if(max16 < 0 || max16 > 15) max16 = 15;
    var c16, c10, b=[];
    for(var i = 0; i < a.length; i++) {
        c16 = parseInt(a.charAt(i), 16);
        c10 = parseInt(max16 - c16, 10);
        if(c10 < 0) c10 = Math.abs(c10);
        b.push(c10.toString(16));
    }
    return '#' + b.join('');
}

function writeIn(name, value) {
    document.getElementById(name).innerHTML = value;
}

function changeNumber(value) {
    var a = parseInt(value);
    b = a + 1;
    for (var i = a; i >= 1; i--)
        document.getElementById('n' + i).style.display = 'inherit';
    for (var j = b; j <= 10; j++) document.getElementById('n' + j).style.display = 'none';
    document.getElementById('page_size_value').innerHTML = value.toString();
    //drawConfigs();
}

function changeColor(element, mode, name, color, node) {
    var tmp = color;
    color = convertABGR2RGBA(color);
    switch (mode) {
        case 'bg':
            document.getElementById(element).style.backgroundColor = '#' + color;
            break;
        case 'bd':
            document.getElementById(element).style.borderColor = '#' + color;
            break;
        case 'name':
            document.getElementById(name).style.color = '#' + color;
            break;
        case 'n':
            for(i=2;i<=10;i++)
                document.getElementById(name + i).style.color = '#' + color;
            break;
        case 'nd':
            var _cbs = document.getElementsByClassName('_candidate_back');
            for(var i = 0; i < _cbs.length; i++)
                _cbs[i].style.borderColor = '#' + color;
            break;
        case 'nb':
            for(i=2;i<=10;i++)
                document.getElementById(name + i).style.backgroundColor = '#' + color;
            break;
        default:
            document.getElementById(element).style.color = '#' + color;
    }
    if(node != undefined)
        exConvert(node, tmp, color);
    //drawConfigs();
}

function change_round_corner(element, radius) {
    document.getElementById(element).style.borderRadius = radius;
    //drawConfigs();
}

function exMode(origin, direction, color) {
    a = color.toString();
    if (a.length != 6) { alert("Error!"); } else {
        b = a[4] + a[5] + a[2] + a[3] + a[0] + a[1];
        a = a.toUpperCase();
        b = b.toUpperCase();
        if (origin == "rgb") {
            document.getElementById(origin).style.backgroundColor = '#' + a;
            document.getElementById(direction).style.backgroundColor = '#' + a;
            document.getElementById(origin).value = a;
            document.getElementById(direction).value = b;
        } else if (origin == "bgr") {
            document.getElementById(origin).style.backgroundColor = '#' + b;
            document.getElementById(origin).value = a;
            document.getElementById(direction).style.backgroundColor = '#' + b;
            document.getElementById(direction).value = b;
        }
    }
}

function convertABGR2RGBA(color)
{
    if(color.length > 6)
        color = color.slice(6,8) + color.slice(4,6) + color.slice(2,4) + color.slice(0,2)
    else
        color = color.slice(4) + color.slice(2,4) + color.slice(0,2)
    return color; 
}
parseColorCode = function(csscolor) {
    if(csscolor.length > 6)    csscolor = csscolor.slice(0,6);
    var r = parseInt(csscolor.slice(0,2), 16);
    var g = parseInt(csscolor.slice(2,4), 16);
    var b = parseInt(csscolor.slice(4), 16);
    return parseColor(r,g,b);
}
parseColor = function(r, g, b){
    return {
        red: r,
        green: g,
        blue: b
    };
}

function RGBtoHSV(rgb) {
    var rr, gg, bb,
    r = parseInt(rgb.red) / 255,
    g = parseInt(rgb.green) / 255,
    b = parseInt(rgb.blue) / 255,
    h, s,
    v = Math.max(r, g, b),
    diff = v - Math.min(r, g, b),
    diffc = function(c){
        return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;  rr = diffc(r); gg = diffc(g); bb = diffc(b);
        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

function InvertColor(color){
    var nc = color;
    if(color.length > 6)
        nc = color.slice(2);
    var b = parseInt(nc.slice(0,2), 16);
    var g = parseInt(nc.slice(2,4), 16);
    var r = parseInt(nc.slice(4), 16);
    var rr = 255 - r;
    var gg = 255 - g;
    var bb = 255 - b;
    if (
        Math.abs(rr - r) < 40 ||
        Math.abs(bb - b) < 40 ||
        Math.abs(gg - g) < 40
    )
    {rr = 0; gg = 0; bb = 0;}
    return (
        '#' + 
        rr.toString(16) +
        gg.toString(16) +
        bb.toString(16)  
    );
}


function drawConfigs() {
    var text = '小狼毫';
    var preedit = 'pei se';
    var orders = ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '0.'];
    var txts = ['配色', '陪', '配', '賠', '培', '佩', '裴', '斐', '呸', '胚'];
    var cmtxt = ['pei se', 'pei', 'pei', 'pei', 'pei', 'pei', 'pei', 'pei', 'pei', 'pei'];
    var border_width = parseInt(document.getElementById('border_width').value);
    var margin_x = parseInt(document.getElementById('margin_x').value);
    var margin_y = parseInt(document.getElementById('margin_y').value);
    var spacing = parseInt(document.getElementById('spacing').value);
    var candidate_spacing = parseInt(document.getElementById('candidate_spacing').value);
    var hilite_spacing = parseInt(document.getElementById('hilite_spacing').value);
    if (document.getElementById('hilite_padding').value < 0)
        document.getElementById('hilite_padding').value = 0;
    var hilite_padding = parseInt(document.getElementById('hilite_padding').value);
    var font_point = parseInt(document.getElementById('font_point').value);
    if (document.getElementById('round_corner').value > (font_point / 2 + hilite_padding))
        document.getElementById('round_corner').value = (font_point / 2 + hilite_padding);
    if (document.getElementById('round_corner').value < 0)
        document.getElementById('round_corner').value = 0;

    var round_corner = parseInt(document.getElementById('round_corner').value);
    // 获取颜色设定
    // 背景颜色
    var backcolor = '#' + convertABGR2RGBA( document.getElementsByName('back_color')[0].value);
    // 边框颜色
    var bordercolor = '#' + document.getElementsByName('border_color')[0].value;
    // 内选区域中已经完成选字部分的文字颜色
    var text_color = '#' + document.getElementsByName('text_color')[0].value;
    // 内选区域中编码的颜色
    var hilite_text_color = '#' + document.getElementsByName('hilited_text_color')[0].value;
    // 内选区域中编码的背景色
    var hilite_back_color = '#' + document.getElementsByName('hilited_back_color')[0].value;
    // 当前高亮的候选文字的颜色 
    var hilited_candidate_text_color = '#' + document.getElementsByName('hilited_candidate_text_color')[0].value;
    // 当前高亮的候选文字的背景色
    var hilited_candidate_back_color = '#' + document.getElementsByName('hilited_candidate_back_color')[0].value;
    // 其他候选文字颜色
    var candidate_text_color = '#' + document.getElementsByName('candidate_text_color')[0].value;
    // 其他候选文字 的备注提示颜色
    var comment_text_color = '#' + document.getElementsByName('comment_text_color')[0].value;

    // horizontal checkbox状态
    var horizontal = document.getElementById('horizontal').checked;
    var inline_preedit = document.getElementById('inline_preedit').checked;

    var font_face = document.getElementById('font_face').value;
    var menu_size = parseInt(document.getElementsByName('number')[0].value);
    // 更新代码生成区style部分的内容
    document.getElementById('style_font_face').textContent = '"' + font_face + '"';
    document.getElementById('style_font_point').textContent = font_point;
    document.getElementById('style_horizontal').textContent = horizontal.toString();
    document.getElementById('style_inline_preedit').textContent = inline_preedit.toString();
    document.getElementById('layout_border_width').textContent = border_width;
    document.getElementById('layout_margin_x').textContent = margin_x;
    document.getElementById('layout_margin_y').textContent = margin_y;
    document.getElementById('layout_spacing').textContent = spacing;
    document.getElementById('layout_candidate_spacing').textContent = candidate_spacing;
    document.getElementById('layout_hilite_padding').textContent = hilite_padding;
    document.getElementById('layout_hilite_spacing').textContent = hilite_spacing;
    document.getElementById('layout_round_corner').textContent = round_corner;
    document.getElementById('menu_size').textContent = menu_size;
    // 更新代码生成区style部分的内容 结束
    // ---------------------------------------------------------
    // 绘图过程
    var c = document.getElementById('drawing');
    var ctx = c.getContext("2d");
    var tmp;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.font = font_point + 'px ' + font_face;

    var x, y, i;
    x = margin_x;
    y = margin_y;
    var height, w;
    var tc = '#000';
    // 候选高亮色块宽度
    var hilited_candidate_back_width = 0;
    if (!horizontal) { // vertical
        if (!inline_preedit) { // vertical not preedit
            // 背景
            w = 0;
            height = 0;
            tmp = ctx.measureText(text).width + 2 * hilite_spacing + ctx.measureText(preedit).width + ctx.measureText('^').width + 2 * margin_x;
            tmp = Math.max(ctx.measureText(orders[0]).width + ctx.measureText(txts[0]).width + ctx.measureText(cmtxt[0]).width + 2 * hilite_spacing + 2 * margin_x, tmp);
            h = margin_y * 2 + font_point * (menu_size + 1) + spacing + (menu_size - 1) * candidate_spacing;
            fillRoundedRect(ctx, w, height, tmp, h, 0, backcolor);
            // 色块
            // preedit
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            fillRoundedRect(ctx, margin_x + ctx.measureText(text).width + hilite_spacing - hilite_padding,
                margin_y - hilite_padding, ctx.measureText(preedit).width + 2 * hilite_padding, font_point + 2 * hilite_padding, round_corner, hilite_back_color);
            ctx.restore();
            // hilited_candidate_back
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            hilited_candidate_back_width = ctx.measureText(text).width + 2 * hilite_spacing + ctx.measureText(preedit).width + ctx.measureText('^').width + 2 * hilite_padding;
            hilited_candidate_back_width = Math.max(ctx.measureText(orders[0]).width + ctx.measureText(txts[0]).width + ctx.measureText(cmtxt[0]).width + 2 * hilite_spacing + 2 * hilite_padding, hilited_candidate_back_width);
            fillRoundedRect(ctx, margin_x - hilite_padding, margin_y + font_point + spacing - hilite_padding,
                hilited_candidate_back_width, font_point + 2 * hilite_padding, round_corner, hilited_candidate_back_color);
            ctx.restore();

            // 图框
            ctx.beginPath();
            ctx.lineWidth = border_width;
            ctx.strokeStyle = bordercolor;
            ctx.rect(0, 0, tmp, h);
            ctx.stroke();

            // 内选区域及文字 
            DrawTxt(ctx, margin_x, margin_y, text, ctx.font, text_color);
            DrawTxt(ctx, margin_x + ctx.measureText(text).width + hilite_spacing, margin_y, preedit, ctx.font, hilite_text_color);
            DrawTxt(ctx, margin_x + ctx.measureText(text).width + hilite_spacing * 2 + ctx.measureText(preedit).width, margin_y, '^', ctx.font, text_color);

            //绘制候选文字
            height = margin_y + font_point + spacing;
            for (i = 0; i < menu_size; i++) {
                if (i > 0) {
                    height += candidate_spacing;
                    tc = candidate_text_color;
                } else {
                    tc = hilited_candidate_text_color;
                }
                w = margin_x;
                h = 0;
                DrawTxt(ctx, w, height, orders[i], ctx.font, tc);
                w += ctx.measureText(orders[i]).width + hilite_spacing;
                DrawTxt(ctx, w, height, txts[i], ctx.font, tc);
                w += ctx.measureText(txts[i]).width + hilite_spacing;
                DrawTxt(ctx, w, height, cmtxt[i], ctx.font, comment_text_color);
                h = Math.max(h, font_point);
                height += h;
            }
        } else { // vertical preedit
            var offset_y = 10;
            w = 0;
            height = offset_y;
            ctx.font = 16 + 'px ' + font_face;
            DrawTxt(ctx, w, height, text, ctx.font, text_color);
            w += ctx.measureText(text).width;
            // 候选框和preedit的开头位置x平齐,y = preedit的y坐标+16+spacing
            height += (16 + spacing) - margin_y;
            // 计算候选区的款高
            h = 2 * margin_y + menu_size * font_point + (menu_size - 1) * candidate_spacing;
            // 切换字体
            ctx.font = font_point + 'px ' + font_face;
            //候选区宽度
            tmp = 2 * margin_x + ctx.measureText(orders[0]).width + 2 * hilite_spacing +
                ctx.measureText(txts[0]).width + ctx.measureText(cmtxt[0]).width;
            fillRoundedRect(ctx, w, height, tmp, h, 0, backcolor);
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            fillRoundedRect(ctx, w + margin_x - hilite_padding, height + margin_y - hilite_padding,
                2 * hilite_padding + ctx.measureText(orders[0]).width + 2 * hilite_spacing + ctx.measureText(txts[0]).width + ctx.measureText(cmtxt[0]).width,
                2 * hilite_padding + font_point,
                round_corner, hilited_candidate_back_color);
            ctx.restore();

            // 绘制内选preedit和其背景
            ctx.font = 16 + 'px ' + font_face;
            fillRoundedRect(ctx, ctx.measureText(text).width, offset_y, ctx.measureText(preedit).width,
                16, 0, hilite_back_color);
            DrawTxt(ctx, ctx.measureText(text).width, offset_y, preedit, ctx.font, hilite_text_color);
            ctx.font = font_point + 'px ' + font_face;
            // 绘制图框
            ctx.beginPath();
            ctx.lineWidth = border_width;
            ctx.strokeStyle = bordercolor;
            ctx.rect(w, height, tmp, h);
            ctx.stroke();

            w += margin_x;
            tmp = w;
            //绘制候选文字
            height += margin_y;
            for (i = 0; i < menu_size; i++) {
                if (i > 0) {
                    height += candidate_spacing;
                    tc = candidate_text_color;
                } else {
                    tc = hilited_candidate_text_color;
                }
                w = tmp;
                h = 0;
                DrawTxt(ctx, w, height, orders[i], ctx.font, tc);
                w += ctx.measureText(orders[i]).width + hilite_spacing;
                DrawTxt(ctx, w, height, txts[i], ctx.font, tc);
                w += ctx.measureText(txts[i]).width + hilite_spacing;
                DrawTxt(ctx, w, height, cmtxt[i], ctx.font, comment_text_color);
                h = Math.max(h, font_point);
                height += h;
            }
        }

    } else { // horizontal状态
        if (!inline_preedit) { // horizontal not preedit
            hilited_candidate_back_width = ctx.measureText(text).width + hilite_spacing + ctx.measureText(preedit).width + hilite_spacing +
                ctx.measureText('>').width + hilite_padding * 2;
            w = 2 * margin_x;
            for (i = 0; i < menu_size; i++) {
                w += ctx.measureText(orders[i]).width + hilite_spacing;
                w += ctx.measureText(txts[i]).width + hilite_spacing;
                w += ctx.measureText(cmtxt[i]).width;
                if (i != menu_size + 1) w += candidate_spacing;
            }
            w -= candidate_spacing;
            // 图框宽度=输入栏的宽度和候选栏宽度的较大值
            tmp = Math.max(hilited_candidate_back_width, w);
            h = 2 * margin_y + 2 * font_point + spacing;
            fillRoundedRect(ctx, 0, 0, tmp, h, 0, backcolor);

            height = margin_y;
            w = margin_x + ctx.measureText(text).width + hilite_spacing;

            // 高亮部分只在输入框内,javascript 设定globalCompositeOperation = 'atop',前要save,后要restore
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            fillRoundedRect(ctx, w - hilite_padding, height - hilite_padding, ctx.measureText(preedit).width + 2 * hilite_padding,
                font_point + 2 * hilite_padding, round_corner, hilite_back_color);
            ctx.restore();

            DrawTxt(ctx, w, height, preedit, ctx.font, hilite_text_color);
            w += ctx.measureText(preedit).width + hilite_spacing;
            DrawTxt(ctx, w, height + font_point, '^', ctx.font, text_color);
            w = margin_x;
            DrawTxt(ctx, w, height, text, ctx.font, text_color);
            // 绘制高亮候选的底色
            w = margin_x - hilite_padding;
            height = margin_y + font_point + spacing - hilite_padding;
            hilited_candidate_back_width = 2 * hilite_padding + ctx.measureText(orders[0]).width + 2 * hilite_spacing + ctx.measureText(txts[0]).width +
                ctx.measureText(cmtxt[0]).width;

            // 高亮部分只在输入框内,javascript 设定globalCompositeOperation = 'atop',前要save,后要restore
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            fillRoundedRect(ctx, w, height, hilited_candidate_back_width, hilite_padding * 2 + font_point, round_corner, hilited_candidate_back_color);
            ctx.restore();
            // border
            ctx.beginPath();
            ctx.lineWidth = border_width;
            ctx.strokeStyle = bordercolor;
            ctx.rect(0, 0, tmp, h);
            ctx.stroke();

            // 绘制候选区
            w = margin_x;
            height = margin_y + font_point + spacing;
            for (i = 0; i < menu_size; i++) {
                if (i > 0) {
                    w += candidate_spacing;
                    tc = candidate_text_color;
                } else {
                    tc = hilited_candidate_text_color;
                }
                DrawTxt(ctx, w, height, orders[i], ctx.font, tc);
                w += ctx.measureText(orders[i]).width + hilite_spacing;
                DrawTxt(ctx, w, height, txts[i], ctx.font, tc);
                w += ctx.measureText(txts[i]).width + hilite_spacing;
                DrawTxt(ctx, w, height, cmtxt[i], ctx.font, comment_text_color);
                w += ctx.measureText(cmtxt[i]).width;
            }
        } else {
            var offset_y = 10;
            w = 0;
            height = offset_y;
            ctx.font = 16 + 'px ' + font_face;
            w = margin_x;
            DrawTxt(ctx, w, height, text, ctx.font, text_color);
            w += ctx.measureText(text).width;
            // 候选框和preedit的开头位置x平齐,y = preedit的y坐标+16+spacing
            // 切换字体
            height += (16 + spacing) - margin_y;
            // 计算候选区的款高
            h = font_point + margin_y * 2;
            ctx.font = font_point + 'px ' + font_face;
            tmp = 2 * margin_x;
            for (i = 0; i < menu_size; i++) {
                tmp += ctx.measureText(orders[i]).width + hilite_spacing;
                tmp += ctx.measureText(txts[i]).width + hilite_spacing;
                tmp += ctx.measureText(cmtxt[i]).width;
                if (i != menu_size - 1) tmp += candidate_spacing;
            }
            // 候选区背景色
            fillRoundedRect(ctx, w, height, tmp, h, 0, backcolor);
            // 候选区边框
            ctx.beginPath();
            ctx.lineWidth = border_width;
            ctx.strokeStyle = bordercolor;
            ctx.rect(w, height, tmp, h);
            ctx.stroke();

            w += margin_x;
            height += margin_y;
            // 候选高亮宽度计算
            hilited_candidate_back_width = ctx.measureText(orders[0]).width + 2 * hilite_spacing +
                ctx.measureText(txts[0]).width + ctx.measureText(cmtxt[0]).width + 2 * hilite_padding;
            // source-atop, 让候选区高亮不超出候选区背景范围
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            fillRoundedRect(ctx, w - hilite_padding, height - hilite_padding,
                hilited_candidate_back_width, hilite_padding * 2 + font_point, round_corner, hilited_candidate_back_color);
            ctx.restore();

            // 先将候选区的高亮背景绘制,再绘制内选区的高亮和preedit,避免候选区的块盖到内选区的问题
            // height = offset_y, w = margin_x+ctx.measureText(text).width  
            ctx.font = 16 + 'px ' + font_face;
            fillRoundedRect(ctx, margin_x + ctx.measureText(text).width, offset_y, ctx.measureText(preedit).width, 16, 0, hilite_back_color);
            DrawTxt(ctx, margin_x + ctx.measureText(text).width, offset_y, preedit, ctx.font, hilite_text_color);
            ctx.font = font_point + 'px ' + font_face;
            // 绘制候选区文字
            for (i = 0; i < menu_size; i++) {
                if (i > 0) {
                    w += candidate_spacing;
                    tc = candidate_text_color;
                } else {
                    tc = hilited_candidate_text_color;
                }
                DrawTxt(ctx, w, height, orders[i], ctx.font, tc);
                w += ctx.measureText(orders[i]).width + hilite_spacing;
                DrawTxt(ctx, w, height, txts[i], ctx.font, tc);
                w += ctx.measureText(txts[i]).width + hilite_spacing;
                DrawTxt(ctx, w, height, cmtxt[i], ctx.font, comment_text_color);
                w += ctx.measureText(cmtxt[i]).width;
            }
        }
    }
}

function drawLine(context, startX, startY, endX, endY, color, width) {
    context.strokeStyle = color;
    context.lineWidth = width;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.closePath();
    context.stroke();
};

function Rect(x, y, w, h) {
    return {
        x: x,
        y: y,
        width: w,
        height: h
    };
}

function fillRoundedRect(ctx, startX, startY, width, height, radius, color) {
    if (radius <= 0) {
        DrawRect(ctx, startX, startY, width, height, color);
    } else {
        if (radius > (height / 2))
            radius = (height / 2);
        ctx.fillStyle = color;
        var rect = Rect(startX, startY, width, height);
        ctx.strokeStyle = color;
        drawUsingArc(rect, radius, ctx);
        fillArc(ctx, startX + radius, startY + radius, radius, color);
        fillArc(ctx, startX + width - radius, startY + radius, radius, color);
        fillArc(ctx, startX + width - radius, startY + height - radius, radius, color);
        fillArc(ctx, startX + radius, startY + height - radius, radius, color);
        DrawRect(ctx, startX, startY + radius, width, height - 2 * radius, color);
        DrawRect(ctx, startX + radius, startY, width - 2 * radius, height, color);
    }
}

function fillArc(ctx, cx, cy, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function drawUsingArc(rect, r, ctx) {
    var path = new Path2D();
    path.moveTo(rect.x + r, rect.y);
    path.lineTo(rect.x + rect.width - r, rect.y);
    path.arc(rect.x + rect.width - r, rect.y + r, r, Math.PI / 180 * 270, 0, false);
    path.lineTo(rect.x + rect.width, rect.y + rect.height - r);
    path.arc(rect.x + rect.width - r, rect.y + rect.height - r, r, 0, Math.PI / 180 * 90, 0, false);
    path.lineTo(rect.x + r, rect.y + rect.height);
    path.arc(rect.x + r, rect.y + rect.height - r, r, Math.PI / 180 * 90, Math.PI / 180 * 180, false);
    path.lineTo(rect.x, rect.y + r);
    path.arc(rect.x + r, rect.y + r, r, Math.PI / 180 * 180, Math.PI / 180 * 270, false);
    ctx.stroke(path);
}

function DrawRect(ctx, startX, startY, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(startX, startY, width, height);
};

function DrawTxt(ctx, startX, startY, txt, font, txtColor) {
    ctx.fillStyle = txtColor;
    ctx.textBaseline = 'top';
    ctx.font = font;
    ctx.fillText(txt, startX, startY);
};
