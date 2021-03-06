function exConvert(name, color) {
    a = color.toString();
    a = a[4] + a[5] + a[2] + a[3] + a[0] + a[1];
    color = a.toUpperCase();
    document.getElementById(name + '_color').innerHTML = color;
    drawConfigs();
}

function writeIn(name, value) {
    document.getElementById(name).innerHTML = value;
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
    var text = '?????????';
    var preedit = 'pei se';
    var orders = ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.'];
    var txts = ['??????', '???', '???', '???', '???', '???', '???', '???', '???'];
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
    // ??????????????????
    // ????????????
    var backcolor = '#' + document.getElementsByName('back')[0].value;
    // ????????????
    var bordercolor = '#' + document.getElementsByName('border')[0].value;
    // ??????????????????????????????????????????????????????
    var text_color = '#' + document.getElementsByName('text')[0].value;
    // ??????????????????????????????
    var hilite_text_color = '#' + document.getElementsByName('hilited_text')[0].value;
    // ?????????????????????????????????
    var hilite_back_color = '#' + document.getElementsByName('hilited_back')[0].value;
    // ???????????????????????????????????? 
    var hilited_candidate_text_color = '#' + document.getElementsByName('hilited_candidate_text')[0].value;
    // ???????????????????????????????????????
    var hilited_candidate_back_color = '#' + document.getElementsByName('hilited_candidate_back')[0].value;
    // ????????????????????????
    var candidate_text_color = '#' + document.getElementsByName('candidate_text')[0].value;
    // ?????????????????? ?????????????????????
    var comment_text_color = '#' + document.getElementsByName('comment_text')[0].value;

    // horizontal checkbox??????
    var horizontal = document.getElementById('horizontal').checked;
    var inline_preedit = document.getElementById('inline_preedit').checked;

    var font_face = document.getElementById('font_face').value;
    var menu_size = parseInt(document.getElementsByName('number')[0].value);
    // ?????????????????????style???????????????
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
    // ?????????????????????style??????????????? ??????
    // ---------------------------------------------------------
    // ????????????
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
    // ????????????????????????
    var hilited_candidate_back_width = 0;
    if (!horizontal) { // vertical
        if (!inline_preedit) { // vertical not preedit
            // ??????
            w = 0;
            height = 0;
            tmp = ctx.measureText(text).width + 2 * hilite_spacing + ctx.measureText(preedit).width + ctx.measureText('^').width + 2 * margin_x;
            tmp = Math.max(ctx.measureText(orders[0]).width + ctx.measureText(txts[0]).width + ctx.measureText(cmtxt[0]).width + 2 * hilite_spacing + 2 * margin_x, tmp);
            h = margin_y * 2 + font_point * (menu_size + 1) + spacing + (menu_size - 1) * candidate_spacing;
            fillRoundedRect(ctx, w, height, tmp, h, 0, backcolor);
            // ??????
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

            // ??????
            ctx.beginPath();
            ctx.lineWidth = border_width;
            ctx.strokeStyle = bordercolor;
            ctx.rect(0, 0, tmp, h);
            ctx.stroke();

            // ????????????????????? 
            DrawTxt(ctx, margin_x, margin_y, text, ctx.font, text_color);
            DrawTxt(ctx, margin_x + ctx.measureText(text).width + hilite_spacing, margin_y, preedit, ctx.font, hilite_text_color);
            DrawTxt(ctx, margin_x + ctx.measureText(text).width + hilite_spacing * 2 + ctx.measureText(preedit).width, margin_y, '^', ctx.font, text_color);

            //??????????????????
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
            // ????????????preedit???????????????x??????,y = preedit???y??????+16+spacing
            height += (16 + spacing) - margin_y;
            // ????????????????????????
            h = 2 * margin_y + menu_size * font_point + (menu_size - 1) * candidate_spacing;
            // ????????????
            ctx.font = font_point + 'px ' + font_face;
            //???????????????
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

            // ????????????preedit????????????
            ctx.font = 16 + 'px ' + font_face;
            fillRoundedRect(ctx, ctx.measureText(text).width, offset_y, ctx.measureText(preedit).width,
                16, 0, hilite_back_color);
            DrawTxt(ctx, ctx.measureText(text).width, offset_y, preedit, ctx.font, hilite_text_color);
            ctx.font = font_point + 'px ' + font_face;
            // ????????????
            ctx.beginPath();
            ctx.lineWidth = border_width;
            ctx.strokeStyle = bordercolor;
            ctx.rect(w, height, tmp, h);
            ctx.stroke();

            w += margin_x;
            tmp = w;
            //??????????????????
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

    } else { // horizontal??????
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
            // ????????????=????????????????????????????????????????????????
            tmp = Math.max(hilited_candidate_back_width, w);
            h = 2 * margin_y + 2 * font_point + spacing;
            fillRoundedRect(ctx, 0, 0, tmp, h, 0, backcolor);

            height = margin_y;
            w = margin_x + ctx.measureText(text).width + hilite_spacing;

            // ??????????????????????????????,javascript ??????globalCompositeOperation = 'atop',??????save,??????restore
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
            // ???????????????????????????
            w = margin_x - hilite_padding;
            height = margin_y + font_point + spacing - hilite_padding;
            hilited_candidate_back_width = 2 * hilite_padding + ctx.measureText(orders[0]).width + 2 * hilite_spacing + ctx.measureText(txts[0]).width +
                ctx.measureText(cmtxt[0]).width;

            // ??????????????????????????????,javascript ??????globalCompositeOperation = 'atop',??????save,??????restore
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

            // ???????????????
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
            // ????????????preedit???????????????x??????,y = preedit???y??????+16+spacing
            // ????????????
            height += (16 + spacing) - margin_y;
            // ????????????????????????
            h = font_point + margin_y * 2;
            ctx.font = font_point + 'px ' + font_face;
            tmp = 2 * margin_x;
            for (i = 0; i < menu_size; i++) {
                tmp += ctx.measureText(orders[i]).width + hilite_spacing;
                tmp += ctx.measureText(txts[i]).width + hilite_spacing;
                tmp += ctx.measureText(cmtxt[i]).width;
                if (i != menu_size - 1) tmp += candidate_spacing;
            }
            // ??????????????????
            fillRoundedRect(ctx, w, height, tmp, h, 0, backcolor);
            // ???????????????
            ctx.beginPath();
            ctx.lineWidth = border_width;
            ctx.strokeStyle = bordercolor;
            ctx.rect(w, height, tmp, h);
            ctx.stroke();

            w += margin_x;
            height += margin_y;
            // ????????????????????????
            hilited_candidate_back_width = ctx.measureText(orders[0]).width + 2 * hilite_spacing +
                ctx.measureText(txts[0]).width + ctx.measureText(cmtxt[0]).width + 2 * hilite_padding;
            // source-atop, ????????????????????????????????????????????????
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            fillRoundedRect(ctx, w - hilite_padding, height - hilite_padding,
                hilited_candidate_back_width, hilite_padding * 2 + font_point, round_corner, hilited_candidate_back_color);
            ctx.restore();

            // ????????????????????????????????????,??????????????????????????????preedit,?????????????????????????????????????????????
            // height = offset_y, w = margin_x+ctx.measureText(text).width  
            ctx.font = 16 + 'px ' + font_face;
            fillRoundedRect(ctx, margin_x + ctx.measureText(text).width, offset_y, ctx.measureText(preedit).width, 16, 0, hilite_back_color);
            DrawTxt(ctx, margin_x + ctx.measureText(text).width, offset_y, preedit, ctx.font, hilite_text_color);
            ctx.font = font_point + 'px ' + font_face;
            // ?????????????????????
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