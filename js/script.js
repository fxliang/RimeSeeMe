function exConvert(name, color) {
    a = color.toString();
    a = a[4] + a[5] + a[2] + a[3] + a[0] + a[1];
    color = a.toUpperCase();
    document.getElementById(name + '_color').innerHTML = color;
    drawConfigs();
}

function writeIn(name, value) {
    document.getElementById(name).innerHTML = value;
    drawConfigs();
}

function changeNumber(value) {
    var a = parseInt(value);
    b = a + 1;
    for (var i = a; i >= 1; i--)
        document.getElementById('n' + i).style.display = 'inherit';
    for (var j = b; j <= 9; j++) document.getElementById('n' + j).style.display = 'none';
    drawConfigs();
}

function changeColor(element, mode, name, color) {
    var BG = "bg",
        BD = "bd";
    switch (mode) {
        case BG:
            document.getElementById(element).style.backgroundColor = '#' + color;
            break;
        case BD:
            document.getElementById(element).style.borderColor = '#' + color;
            break;
        default:
            document.getElementById(element).style.color = '#' + color;
    }
    color = exConvert(name, color);
    drawConfigs();
}

function change_round_corner(element, radius) {
    document.getElementById(element).style.borderRadius = radius;
    drawConfigs();
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

function drawConfigs() {
    var text = '小狼毫';
    var preedit = 'pei se';
    var orders = ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.'];
    var txts = ['配色', '陪', '配', '賠', '培', '佩', '裴', '斐', '呸'];
    var cmtxt = ['pei se', 'pei', 'pei', 'pei', 'pei', 'pei', 'pei', 'pei', 'pei'];
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
    var backcolor = '#' + document.getElementsByName('back')[0].value;
    // 边框颜色
    var bordercolor = '#' + document.getElementsByName('border')[0].value;
    // 内选区域中已经完成选字部分的文字颜色
    var text_color = '#' + document.getElementsByName('text')[0].value;
    // 内选区域中编码的颜色
    var hilite_text_color = '#' + document.getElementsByName('hilited_text')[0].value;
    // 内选区域中编码的背景色
    var hilite_back_color = '#' + document.getElementsByName('hilited_back')[0].value;
    // 当前高亮的候选文字的颜色 
    var hilited_candidate_text_color = '#' + document.getElementsByName('hilited_candidate_text')[0].value;
    // 当前高亮的候选文字的背景色
    var hilited_candidate_back_color = '#' + document.getElementsByName('hilited_candidate_back')[0].value;
    // 其他候选文字颜色
    var candidate_text_color = '#' + document.getElementsByName('candidate_text')[0].value;
    // 其他候选文字 的备注提示颜色
    var comment_text_color = '#' + document.getElementsByName('comment_text')[0].value;

    // horizontal checkbox状态
    var horizontal = document.getElementById('horizontal').checked;
    var preedited = document.getElementById('preedit').checked;

    var font_face = document.getElementById('font_face').value;
    var menu_size = parseInt(document.getElementsByName('number')[0].value);
    // ---------------------------------------------------------
    // 绘图过程
    var c = document.getElementById('drawing');
    var ctx = c.getContext("2d");
    var tmp;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.font = font_point + 'px ' + font_face;
    //ctx.globalCompositeOperation = 'source-atop';

    var x, y, i;
    x = margin_x;
    y = margin_y;
    var height, w;
    var tc = '#000';
    // 候选高亮色块宽度
    var hilited_candidate_back_width = 0;
    if (!horizontal) {
        if (!preedited) {
            // 绘制内选区域
            // 候选区最长字符串计算高亮宽度
            for (i = 0; i < menu_size; i++) {
                w = ctx.measureText(orders[i]).width + hilite_spacing + ctx.measureText(txts[i]).width +
                    hilite_spacing + ctx.measureText(cmtxt[i]).width + 2 * hilite_padding;
                hilited_candidate_back_width = Math.max(hilited_candidate_back_width, w);
            }
            // 输入区域的高亮宽度
            w = ctx.measureText(text).width + hilite_spacing + ctx.measureText(preedit).width + hilite_spacing +
                ctx.measureText('^').width + hilite_padding * 2;
            hilited_candidate_back_width = Math.max(hilited_candidate_back_width, w);
            // 图形框大小高度
            var h = margin_y + font_point + spacing + menu_size * (font_point + candidate_spacing) - candidate_spacing + margin_y;
            // 图形框大小宽度
            tmp = hilited_candidate_back_width - 2 * hilite_padding + 2 * margin_x;
            fillRoundedRect(ctx, 0, 0, tmp, h, 0, backcolor);
            w = margin_x;
            height = margin_y;
            w += ctx.measureText(text).width + hilite_spacing;

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

            // 绘制 候选区域
            // 色块
            w = margin_x - hilite_padding;
            height = margin_y + font_point + spacing - hilite_padding;
            // 高亮部分只在输入框内,javascript 设定globalCompositeOperation = 'atop',前要save,后要restore
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            fillRoundedRect(ctx, w, height, hilited_candidate_back_width, font_point + 2 * hilite_padding, round_corner, hilited_candidate_back_color);
            ctx.restore();

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
            // 图形框大小高度
            var h = margin_y + font_point + spacing + menu_size * (font_point + candidate_spacing) - candidate_spacing + margin_y;
            // 图形框大小宽度
            w = ctx.measureText(text).width + hilite_spacing + ctx.measureText(preedit).width + hilite_spacing +
                ctx.measureText('^').width + margin_x * 2;
            // 绘制图框
            ctx.beginPath();
            ctx.lineWidth = border_width;
            ctx.strokeStyle = bordercolor;
            ctx.rect(0, 0, w, h);
            ctx.stroke();
        }

    } else { // horizontal状态
        if (!preedited) {
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
            w = margin_x;
            height = margin_y;
            w += ctx.measureText(text).width + hilite_spacing;

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
            h = 2 * margin_y + font_point;
        }
        ctx.beginPath();
        ctx.lineWidth = border_width;
        ctx.strokeStyle = bordercolor;
        ctx.rect(0, 0, tmp, h);
        ctx.stroke();
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