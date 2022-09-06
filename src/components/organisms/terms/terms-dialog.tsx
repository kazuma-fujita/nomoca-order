import { Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';

type Props = {
  on: boolean;
  toggle: (nextValue?: any) => void;
};

export const TermsDialog: React.FC<Props> = ({ on, toggle }) => {
  return (
    <Dialog open={on} maxWidth='md' onClose={toggle}>
      <Box display='flex' justifyContent='center' alignItems='center' mt={4}>
        <Box width='80%'>
          <div dangerouslySetInnerHTML={{ __html: termsHTML }}></div>
          <Box display='flex' justifyContent='space-around' mt={4} mb={4}>
            <Button onClick={toggle}>閉じる</Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

const termsHTML = `
<html>

<head>
<meta http-equiv=Content-Type content="text/html; charset=utf-8">
<meta name=Generator content="Microsoft Word 15 (filtered)">
<title>●サービス利用規約</title>

<style id="dynCom" type="text/css"><!-- --></style>
<script language="JavaScript"><!--
function msoCommentShow(anchor_id, com_id)
{
	if(msoBrowserCheck())
		{
		c = document.all(com_id);
		a = document.all(anchor_id);
		if (null != c && null == c.length && null != a && null == a.length)
			{
			var cw = c.offsetWidth;
			var ch = c.offsetHeight;
			var aw = a.offsetWidth;
			var ah = a.offsetHeight;
			var x  = a.offsetLeft;
			var y  = a.offsetTop;
			var el = a;
			while (el.tagName != "BODY")
				{
				el = el.offsetParent;
				x = x + el.offsetLeft;
				y = y + el.offsetTop;
				}
			var bw = document.body.clientWidth;
			var bh = document.body.clientHeight;
			var bsl = document.body.scrollLeft;
			var bst = document.body.scrollTop;
			if (x + cw + ah / 2 > bw + bsl && x + aw - ah / 2 - cw >= bsl )
				{ c.style.left = x + aw - ah / 2 - cw; }
			else
				{ c.style.left = x + ah / 2; }
			if (y + ch + ah / 2 > bh + bst && y + ah / 2 - ch >= bst )
				{ c.style.top = y + ah / 2 - ch; }
			else
				{ c.style.top = y + ah / 2; }
			c.style.visibility = "visible";
}	}	}
function msoCommentHide(com_id)
{
	if(msoBrowserCheck())
		{
		c = document.all(com_id);
		if (null != c && null == c.length)
		{
		c.style.visibility = "hidden";
		c.style.left = -1000;
		c.style.top = -1000;
		} }
}
function msoBrowserCheck()
{
	ms = navigator.appVersion.indexOf("MSIE");
	vers = navigator.appVersion.substring(ms + 5, ms + 6);
	ie4 = (ms > 0) && (parseInt(vers) >= 4);
	return ie4;
}
if (msoBrowserCheck())
{
	document.styleSheets.dynCom.addRule(".msocomanchor","background: infobackground");
	document.styleSheets.dynCom.addRule(".msocomoff","display: none");
	document.styleSheets.dynCom.addRule(".msocomtxt","visibility: hidden");
	document.styleSheets.dynCom.addRule(".msocomtxt","position: absolute");
	document.styleSheets.dynCom.addRule(".msocomtxt","top: -1000");
	document.styleSheets.dynCom.addRule(".msocomtxt","left: -1000");
	document.styleSheets.dynCom.addRule(".msocomtxt","width: 33%");
	document.styleSheets.dynCom.addRule(".msocomtxt","background: infobackground");
	document.styleSheets.dynCom.addRule(".msocomtxt","color: infotext");
	document.styleSheets.dynCom.addRule(".msocomtxt","border-top: 1pt solid threedlightshadow");
	document.styleSheets.dynCom.addRule(".msocomtxt","border-right: 2pt solid threedshadow");
	document.styleSheets.dynCom.addRule(".msocomtxt","border-bottom: 2pt solid threedshadow");
	document.styleSheets.dynCom.addRule(".msocomtxt","border-left: 1pt solid threedlightshadow");
	document.styleSheets.dynCom.addRule(".msocomtxt","padding: 3pt 3pt 3pt 3pt");
	document.styleSheets.dynCom.addRule(".msocomtxt","z-index: 100");
}
// --></script>
<style>
<!--
 /* Font Definitions */
 @font-face
	{font-family:Wingdings;
	panose-1:5 0 0 0 0 0 0 0 0 0;}
@font-face
	{font-family:"ＭＳ 明朝";
	panose-1:2 2 6 9 4 2 5 8 3 4;}
@font-face
	{font-family:"ＭＳ ゴシック";
	panose-1:2 11 6 9 7 2 5 8 2 4;}
@font-face
	{font-family:Mincho;
	panose-1:2 11 6 4 2 2 2 2 2 4;}
@font-face
	{font-family:Century;
	panose-1:2 4 6 4 5 5 5 2 3 4;}
@font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;}
@font-face
	{font-family:"ＭＳ Ｐ明朝";
	panose-1:2 2 6 0 4 2 5 8 3 4;}
@font-face
	{font-family:"ＭＳ Ｐゴシック";
	panose-1:2 11 6 0 7 2 5 8 2 4;}
@font-face
	{font-family:"\@ＭＳ Ｐゴシック";}
@font-face
	{font-family:"\@ＭＳ Ｐ明朝";}
@font-face
	{font-family:"\@ＭＳ ゴシック";
	panose-1:2 11 6 9 7 2 5 8 2 4;}
@font-face
	{font-family:"\@ＭＳ 明朝";
	panose-1:2 2 6 9 4 2 5 8 3 4;}
@font-face
	{font-family:"\@明朝";
	panose-1:2 2 6 9 4 3 5 8 3 5;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{margin:0mm;
	text-align:justify;
	text-justify:inter-ideograph;
	font-size:10.0pt;
	font-family:"Times New Roman",serif;}
p.MsoCommentText, li.MsoCommentText, div.MsoCommentText
	{mso-style-link:"コメント文字列 \(文字\)";
	margin:0mm;
	font-size:10.0pt;
	font-family:"Times New Roman",serif;}
p.MsoHeader, li.MsoHeader, div.MsoHeader
	{mso-style-link:"ヘッダー \(文字\)";
	margin:0mm;
	text-align:justify;
	text-justify:inter-ideograph;
	layout-grid-mode:char;
	font-size:10.0pt;
	font-family:"Times New Roman",serif;}
p.a, li.a, div.a
	{mso-style-name:項;
	margin-top:2.5pt;
	margin-right:0mm;
	margin-bottom:2.5pt;
	margin-left:10.0pt;
	text-align:justify;
	text-justify:inter-ideograph;
	text-indent:-10.0pt;
	font-size:10.0pt;
	font-family:"Times New Roman",serif;}
p.a0, li.a0, div.a0
	{mso-style-name:"号\(項下）";
	margin-top:2.5pt;
	margin-right:0mm;
	margin-bottom:2.5pt;
	margin-left:27.5pt;
	text-align:justify;
	text-justify:inter-ideograph;
	text-indent:-12.5pt;
	font-size:10.0pt;
	font-family:"Times New Roman",serif;}
p.a1, li.a1, div.a1
	{mso-style-name:号（条下）;
	margin-top:2.5pt;
	margin-right:0mm;
	margin-bottom:2.5pt;
	margin-left:17.5pt;
	text-align:justify;
	text-justify:inter-ideograph;
	text-indent:-12.5pt;
	font-size:10.0pt;
	font-family:"Times New Roman",serif;}
p.a2, li.a2, div.a2
	{mso-style-name:条;
	margin-top:7.3pt;
	margin-right:0mm;
	margin-bottom:7.3pt;
	margin-left:31.2pt;
	text-indent:-31.2pt;
	text-autospace:none;
	font-size:10.0pt;
	font-family:"Times New Roman",serif;
	text-decoration:underline;}
p.a3, li.a3, div.a3
	{mso-style-name:条　本文;
	margin-top:0mm;
	margin-right:0mm;
	margin-bottom:2.5pt;
	margin-left:0mm;
	text-align:justify;
	text-justify:inter-ideograph;
	font-size:10.0pt;
	font-family:"Times New Roman",serif;}
span.a4
	{mso-style-name:"ヘッダー \(文字\)";
	mso-style-link:ヘッダー;
	font-family:"Times New Roman",serif;}
span.a5
	{mso-style-name:"コメント文字列 \(文字\)";
	mso-style-link:コメント文字列;
	font-family:"Times New Roman",serif;}
span.msoIns
	{mso-style-name:"";
	text-decoration:underline;
	color:#65B4B4;}
span.msoDel
	{mso-style-name:"";
	text-decoration:line-through;
	color:#FF4B4B;}
.MsoChpDefault
	{font-size:10.0pt;
	font-family:"Century",serif;}
 /* Page Definitions */
 @page WordSection1
	{size:595.3pt 841.9pt;
	margin:30.0mm 30.0mm 30.0mm 30.0mm;
	layout-grid:14.25pt -.35pt;}
div.WordSection1
	{page:WordSection1;}
 /* List Definitions */
 ol
	{margin-bottom:0mm;}
ul
	{margin-bottom:0mm;}
-->
</style>

</head>

<body lang=JA style='word-wrap:break-word;text-justify-trim:punctuation'>

<div class=WordSection1 style='layout-grid:14.25pt -.35pt'>

<p class=MsoNormal align=center style='margin-bottom:6.0pt;text-align:center'><span
style='font-size:14.0pt;font-family:"ＭＳ Ｐゴシック",sans-serif'>利用規約</span></p>

<p class=MsoNormal><span lang=EN-US>&nbsp;</span></p>

<p class=MsoNormal><span style='font-family:"ＭＳ Ｐ明朝",serif'>本利用規約（以下「本規約」といいます。）には、<a
name="_Hlk54376838">株式会社</a></span><span lang=EN-US>GENOVA</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>（以下「当社」といいます。）の提供する本サービス（第</span><span
lang=EN-US>2</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条に定義）のご利用にあたり、ユーザーの皆様に遵守していただかなければならない事項及び当社とユーザーの皆様との間の権利義務関係が定められております。本サービスをご利用になる方は、本規約に同意する前に、必ず全文お読み下さいますようお願い致します。</span></p>

<p class=MsoNormal><span lang=EN-US>&nbsp;</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第1条<span style='font:7.0pt "Times New Roman"'> </span></span><span
style='font-family:"ＭＳ ゴシック"'>適　用</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本規約は、本サービスの利用に関する当社と登録ユーザー（第</span><span
lang=EN-US>2</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条に定義）との間の権利義務関係を定めることを目的とし、登録ユーザーと当社の間の本サービスの利用に関わる一切の関係に適用されます。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社が当社ウェブサイト（第</span><span lang=EN-US>2</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>条に定義）上で随時掲載する本サービスに関するルール、諸規定等は本規約の一部を構成するものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第2条<span style='font:7.0pt "Times New Roman"'> </span></span><span
style='font-family:"ＭＳ ゴシック"'>定　義</span></p>

<p class=a3 style='margin-bottom:7.1pt'><span style='font-family:"ＭＳ Ｐ明朝",serif'>本規約において使用する以下の用語は各々以下に定める意味を有するものとします。</span></p>

<p class=a1 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:33.8pt;text-indent:-24.15pt'><span lang=EN-US>(1)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>「知的財産権」とは、著作権、特許権、実用新案権、商標権、意匠権その他の知的財産権（それらの権利を取得し、又はそれらの権利につき登録等を出願する権利を含みます。）を意味します。</span></p>

<p class=a1 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:33.8pt;text-indent:-24.15pt'><span lang=EN-US>(2)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>「当社ウェブサイト」とは、そのドメインが「</span><span
lang=EN-US>nomoca-order.com</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>」である当社が運営するウェブサイト（理由の如何を問わず当社のウェブサイトのドメイン又は内容が変更された場合は、当該変更後のウェブサイトを含みます。）を意味します。</span></p>

<p class=a1 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:33.8pt;text-indent:-24.15pt'><span lang=EN-US>(3)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>「登録希望者」とは、第</span><span lang=EN-US>3</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>条において定義された「登録希望者」を意味します。</span></p>

<p class=a1 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:33.8pt;text-indent:-24.15pt'><span lang=EN-US>(4)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>「登録情報」とは、第</span><span lang=EN-US>3</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>条において定義された「登録情報」を意味します。</span></p>

<p class=a1 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:33.8pt;text-indent:-24.15pt'><span lang=EN-US>(5)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>「登録ユーザー」とは、第</span><span lang=EN-US>3</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>条に基づき本サービスの利用者としての登録がなされた個人又は法人を意味します。</span></p>

<p class=a1 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:33.8pt;text-indent:-24.15pt'><span lang=EN-US>(6)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>「本商品」とは、本サービスにおいて購入することができる備品その他の商品を意味します。</span></p>

<p class=a1 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:33.8pt;text-indent:-24.15pt'><span lang=EN-US>(7)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>「本サービス」とは、当社が提供する</span><span lang=EN-US>Nomoca
Order</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>という名称の</span><span
lang=EN-US>WEB</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>発注によって商品を購入することができるサービス（理由の如何を問わずサービスの名称又は内容が変更された場合は、当該変更後のサービスを含みます。）を意味します。</span></p>

<p class=a1 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:33.8pt;text-indent:-24.15pt'><span lang=EN-US>(8)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>「利用契約」とは、第</span><span lang=EN-US>3</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>条第</span><span lang=EN-US>4</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>項に定義される「利用契約」を意味します。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第3条<span style='font:7.0pt "Times New Roman"'> </span></span><span
style='font-family:"ＭＳ ゴシック"'>登　録</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本サービスの利用を希望する者（以下「登録希望者」といいます。）は、本規約を遵守することに同意し、かつ当社の定める一定の情報（以下「登録情報」といいます。）を当社の定める方法で当社に提供することにより、当社に対し、本サービスの利用の登録を申請することができます。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録の申請は必ず本サービスを利用する個人又は法人自身が行わなければならず、原則として代理人による登録申請は認められません。また、登録希望者は、登録の申請にあたり、真実、正確かつ最新の情報を当社に提供しなければなりません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、第</span><span lang=EN-US>1</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>項に基づき登録を申請した者が、以下の各号のいずれかの事由に該当する場合は、登録を拒否することがあります。</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(1)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本規約に違反するおそれがあると当社が判断した場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(2)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社に提供された登録情報の全部又は一部につき虚偽、誤記又は記載漏れがあった場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(3)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>過去に本サービスの利用の登録を取り消された者である場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:-9.0pt;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(4)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>未成年者</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:-9.0pt;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(5)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>成年被後見人、被保佐人又は被補助人のいずれかであり、後見人､保佐人又は補助人の同意等を得ていなかった場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:-9.0pt;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(6)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>反社会的勢力等（暴力団、暴力団員、暴力団準構成員、暴力団員又は暴力団準構成員でなくなった日から</span><span
lang=EN-US>5</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>年を経過しない者、暴力団関係企業、総会屋、社会運動等標ぼうゴロ、特殊知能暴力集団その他暴力、威力又は詐欺的手法を使用して経済的利益を追求する集団又は個人を意味します。以下同じ。）である、又は資金提供その他を通じて反社会的勢力等の維持、運営若しくは経営に協力若しくは関与する等反社会的勢力等との何らかの交流若しくは関与を行っていると当社が判断した場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(7)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>その他、当社が登録を適当でないと合理的に判断した場合</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>4.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、前項その他当社の基準に従って、登録希望者の登録の可否を判断し、当社が登録を認める場合にはその旨を登録希望者に通知します。かかる通知により登録希望者の登録ユーザーとしての登録は完了し、本規約の諸規定に従った本サービスの利用にかかる契約（以下「利用契約」といいます。）が登録ユーザーと当社の間に成立します。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>5.  </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、登録情報に変更があった場合は、遅滞なく、当社の定める方法により、当該変更事項を当社に通知し、当社から要求された資料を提出するものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第4条<span style='font:7.0pt "Times New Roman"'> </span></span><span
style='font-family:"ＭＳ ゴシック"'>本サービスの利用</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、利用契約の有効期間中、本規約に従って、当社の定める方法に従い、本サービスを利用することができます。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、本サービスにおいて、当社が定める本商品を、当社の定める方法に従い、個別に購入するだけではなく、定期的に購入することができます（以下、かかる定期購入サービスを「定期便」といいます。）。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーが、当社の定める方法に従って定期便の申込みを行い、定期便に関する契約が成立した場合、以後、当該契約のプランに従って、一定の期間毎に、登録ユーザーは、当該プランに定められた一定の本商品の配送を受けることができます。本規約に定めるほか、プラン（本商品や料金、購入予定月等を含みますが、これらに限られません。）の詳細については、当社ウェブサイト、その他当社が別途定めるところによるものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>4.    </span><a></a><a></a><a><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、プランに定められたある購入予定月の本商品を購入せず、定期便を一時的に中断する場合には、当社が定める期限までに、当社が定める方法で当社に連絡するものとします。</span></a></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>5.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>前項にかかわらず、登録ユーザーは、本商品の仕入れの状況等によっては、事前の予定や予想どおりに本商品を配送できない場合があることを了解するものとします。かかる場合において、当社は速やかに、登録ユーザーに対して連絡を行い、遅れての納品や代替品の納品等の合理的な措置を執ることができるものとします。当社は、当該遅延や代替品の納入等の代替措置に関して登録ユーザーに生じた損害について、責任を負わないものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>6.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、定期便を解約する場合には、当社が定める期限までに、当社の定める方法により、当社に連絡するものとします。この場合、登録ユーザーは、当該購入予定月における購入にかかる利用料金及び費用を負担する義務は負わないものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>7.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>前項において、登録ユーザーが前項に定められた日の翌日以降に定期便を解約した場合、登録ユーザーは、当該購入予定月における購入にかかる利用料金及び費用を負担する義務を負うものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>8.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本サービスには個別のオプションサービスがあり、登録ユーザーは、当社が別途定める方法に従い、当該サービスを利用することができます。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第5条<span style='font:7.0pt "Times New Roman"'> </span></span><span
style='font-family:"ＭＳ ゴシック"'>料金及び支払方法</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、本サービス利用の対価として、当社が別途定める利用料金を負担するものとし、当社が別途定める支払期日に、当社が別途定める支払方法で支払うものとします。振込手数料その他支払に必要な費用は登録ユーザーの負担とします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、本サービスの提供にかかる費用として当社が別途定める費用を負担するものとし、当社が別途定める支払期日に、当社が別途定める支払方法で支払うものとします。振込手数料その他支払に必要な費用は登録ユーザーの負担とします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーが利用料金及び費用の支払を遅滞した場合、登録ユーザーは年</span><span
lang=EN-US>14.6</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>％の割合による遅延損害金を当社に支払うものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>4.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本条に定める利用料金及び費用について、登録ユーザーは返金を求めることはできないものとし、当社は理由の如何を問わず受領済みの利用料金及び費用を返還する義務を負わないものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第6条<span style='font:7.0pt "Times New Roman"'> </span></span><span
style='font-family:"ＭＳ ゴシック"'>本商品の再送等</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本サービスにかかる本商品の所有権及び危険負担は、本商品が登録ユーザーに引き渡された時点で、当社から登録ユーザーに移転するものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社が本商品を配送した日に登録ユーザーが不在等の理由により本商品を引き渡すことができなかった場合で、当該日を含めて</span><span
lang=EN-US>3</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>営業日の間、再配達その他の方法により当該登録ユーザーに対し本商品を引き渡すことができなかったとき、当社は、当該本商品を処分することができるものとします。かかる場合であっても、登録ユーザーは前条に定める利用料金及び費用の支払義務を免れないものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>前項に基づいて、当社が本商品を配送した日を含む</span><span
lang=EN-US>3</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>営業日を経過しても登録ユーザーに対して本サービスにかかる本商品を引き渡すことができないことを理由として、当社が当該本商品を処分したとしても、当社は登録ユーザーに生じた損害について一切の責任を負いません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>4.    </span><a></a><a></a><a><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本商品が以下の各号のいずれかに該当すると当社が合理的に判断する場合、当社は登録ユーザーに対し、当社の判断により、当該本商品を再送し、又は代金を減額するものとします。</span></a></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>(1)   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本商品が破損している場合</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>(2)   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本商品の品質に重大な問題がある場合</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>(3)   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本商品の数量が不足している場合</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>(4)   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>前各号のほか、本商品に当社の責めに帰すべき瑕疵（想定されていた品質を備えていない場合をいいます。）がある場合</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>5.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本条は当社が本商品に対して負う債務不履行責任及び不法行為責任を含む全ての責任を定めており、本条に定めるほか、登録ユーザーは当該本商品の返品を行ったり、再送又は返金、代金減額を求めたりすることはできないものとします（自己の都合による返品等を含みますが、これらに限られません。）。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第7条<span style='font:7.0pt "Times New Roman"'> </span></span><span
style='font-family:"ＭＳ ゴシック"'>アカウント情報の管理</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、自己の責任において、本サービスにかかるユーザー</span><span
lang=EN-US>ID</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>及びパスワード（以下「アカウント情報」といいます。）を管理及び保管するものとし、これを第三者に利用させたり、貸与、譲渡、名義変更、売買等をしてはならないものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.     </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>アカウント情報の管理不十分、使用上の過誤、第三者の使用等による損害の責任は登録ユーザーが負うものとし、当社は一切の責任を負いません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.     </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、</span> <span style='font-family:
"ＭＳ Ｐ明朝",serif'>アカウント情報が盗まれ、又は第三者に使用されていることが判明した場合には、直ちにその旨を当社に通知するとともに、当社からの指示に従うものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第8条<span style='font:7.0pt "Times New Roman"'> </span></span><span
style='font-family:"ＭＳ ゴシック"'>禁止行為</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:0mm;text-indent:0mm'><span style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、本サービスの利用にあたり、以下の各号のいずれかに該当する行為をしてはなりません。</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(1)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社、又は他の登録ユーザーその他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利又は利益を侵害する行為（かかる侵害を直接又は間接に惹起する行為を含みます。）</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(2)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社、又は他の登録ユーザーその他の第三者を誹謗中傷し、信用を傷つける行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(3)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社、又は他の登録ユーザーその他の第三者に対し、不利益、損害若しくは不快感を与える行為、若しくはこれらの者に対して迷惑をかける行為、又はそれらのおそれのある行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(4)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>犯罪行為に関連する行為又は公序良俗に反する行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(5)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>他の登録ユーザーのアカウント情報を利用したり、他の登録ユーザーになりすましたりする行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(6)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本サービス、当社ウェブサイト、当社、又は他の登録ユーザーその他の第三者の情報を改ざんする行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(7)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本商品を第三者に譲渡、転売し、又は使用させる等、自己が利用する以外の目的で本商品を購入するために本サービスを利用する行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(8)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本サービス及び当社ウェブサイトを不正の目的で利用する行為、及び本サービスを通じて得た情報を本サービスの利用目的を超えて、営利目的で利用したり（広告や宣伝を行うことを含みますが、これらに限られません。）、第三者に提供したりする行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(9)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>法令又は当社若しくは登録ユーザーが所属する業界団体の内部規則に違反する行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(10)   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報を送信する行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(11)   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社が定める一定のデータ容量以上のデータを本サービスを通じて送信する行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(12)   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社による本サービスの運営を妨害するおそれのあると合理的に認められる行為</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(13)   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>その他、当社が不適切と合理的に判断する行為</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第9条<span style='font:7.0pt "Times New Roman"'> </span></span><span
style='font-family:"ＭＳ ゴシック"'>本サービスの停止等</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、以下のいずれかに該当する場合には、登録ユーザーに事前に通知することなく、本サービスの利用の全部又は一部を停止又は中断することができるものとします。</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(1)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本サービスにかかるコンピューター・システムの点検又は保守作業を定期的又は緊急に行う場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(2)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>コンピューター、通信回線等が事故により停止した場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(3)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>火災、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(4)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>その他、当社が停止又は中断を合理的に必要と判断した場合</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、当社の合理的な判断により、本サービスの提供を終了することができます。この場合、当社は登録ユーザーに事前に通知するものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、本条に基づき当社が行った措置に基づき登録ユーザーに生じた損害について一切の責任を負いません。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第10条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>設備の負担等</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.     </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本サービスの提供を受けるために必要な、コンピューター、スマートフォン、ソフトウェアその他の機器、通信回線その他の通信環境等の準備及び維持は、登録ユーザーの費用と責任において行うものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは自己の本サービスの利用環境に応じて、コンピューター・ウィルスの感染の防止、不正アクセス及び情報漏洩の防止等のセキュリティ対策を自らの費用と責任において講じるものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、登録ユーザーが送受信したメッセージその他の情報を運営上一定期間保存していた場合であっても、かかる情報を保存する義務を負うものではなく、当社はいつでもこれらの情報を削除できるものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>4.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、本サービスの利用開始に際し又は本サービスの利用中に、当社ウェブサイトからのダウンロードその他の方法によりソフトウェア等を登録ユーザーのコンピューター、スマートフォン等にインストールする場合には、登録ユーザーが保有する情報の消滅若しくは改変又は機器の故障、損傷等が生じないよう十分な注意を払うものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第11条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>権利帰属</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:0mm;text-indent:0mm'><span style='font-family:"ＭＳ Ｐ明朝",serif'>当社ウェブサイト及び本サービスに関する所有権及び知的財産権は全て当社又は当社にライセンスを許諾している者に帰属しており、本規約に定める登録に基づく本サービスの利用許諾は、本規約において明示されているものを除き、当社ウェブサイト又は本サービスに関する当社又は当社にライセンスを許諾している者の知的財産権の譲渡又は使用許諾を意味するものではありません。登録ユーザーは、いかなる理由によっても当社又は当社にライセンスを許諾している者の知的財産権を侵害するおそれのある行為（逆アセンブル、逆コンパイル、リバースエンジニアリングを含みますが、これに限定されません。）をしないものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第12条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>登録取消等</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、登録ユーザーが、以下の各号のいずれかの事由に該当する場合は、事前に通知又は催告することなく、当該登録ユーザーについて本サービスの利用を一時的に停止し、又は登録ユーザーとしての登録を取り消すことができます。</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(1)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本規約のいずれかの条項に違反した場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(2)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録情報に虚偽の事実があることが判明した場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(3)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社、他の登録ユーザーその他の第三者に損害を生じさせるおそれのある目的又は方法で本サービスを利用した、又は利用しようとした場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(4)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>手段の如何を問わず、本サービスの運営を妨害した場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(5)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>支払停止若しくは支払不能となり、又は破産手続開始、民事再生手続開始、会社更生手続開始、特別清算開始若しくはこれらに類する手続の開始の申立てがあった場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(6)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>自ら振出し、若しくは引受けた手形若しくは小切手につき、不渡りの処分を受けた場合、又は手形交換所の取引停止処分その他これに類する措置を受けたとき</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(7)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>差押、仮差押、仮処分、強制執行又は競売の申立てがあった場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(8)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>租税公課の滞納処分を受けた場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(9)    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>死亡した場合又は後見開始、保佐開始若しくは補助開始の審判を受けた場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(10)   6</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>ヶ月以上本サービスの利用がなく、当社からの連絡に対して応答がない場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:-9.0pt;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(11)   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>第</span><span lang=EN-US>3</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>条第</span><span lang=EN-US>3</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>項各号に該当する場合</span></p>

<p class=a0 style='margin-top:7.1pt;margin-right:-9.0pt;margin-bottom:7.1pt;
margin-left:53.15pt;text-indent:-24.15pt'><span lang=EN-US>(12)   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>その他、当社が登録ユーザーとしての登録の継続を適当でないと合理的に判断した場合</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>前項各号のいずれかの事由に該当した場合、登録ユーザーは、当社に対して負っている債務の一切について当然に期限の利益を失い、直ちに当社に対して全ての債務の支払を行わなければなりません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.     </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社及び登録ユーザーは、それぞれ</span><span lang=EN-US>30</span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>日前までに当社所定の方法で相手方に通知することにより、登録ユーザーの登録を取り消すことができます。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>4.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、本条に基づき当社が行った行為により登録ユーザーに生じた損害について一切の責任を負いません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>5.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本条に基づき登録ユーザーの登録が取り消された場合、登録ユーザーは、当社の指示に基づき、当社から提供を受けた本サービスに関連するソフトウェア、マニュアルその他の物につき、返還、廃棄その他の処分を行うものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第13条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>保証の否認及び免責</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、本サービスにおいて提供する本商品その他のサービスにつき、第</span><span
lang=EN-US>6</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条その他本規約で明示的に定める場合を除き、如何なる保証も行うものではありません。本サービスは現状有姿で提供されるものであり、当社は本サービスについて、特定の目的への適合性、有用性、完全性、正確性、最新性、継続性等を含め、一切保証を致しません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーが当社から直接又は間接に、本サービス、当社ウェブサイト、本サービスの他の登録ユーザーその他の事項に関する何らかの情報を得た場合であっても、当社は登録ユーザーに対し本規約において規定されている内容を超えて如何なる保証も行うものではありません。登録ユーザーが本サービス又は当社ウェブサイト上で閲覧することができる、本商品の画像は、一例であり、実際に提供される本商品とは異なる場合があります。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、本サービスを利用することが、登録ユーザーに適用のある法令、業界団体の内部規則等に違反するか否かを自己の責任と費用に基づいて調査するものとし、当社は、登録ユーザーによる本サービスの利用が、登録ユーザーに適用のある法令、業界団体の内部規則等に適合することを何ら保証するものではありません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>4.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本サービス又は当社ウェブサイトに関連して登録ユーザーと他の登録ユーザーその他の第三者との間において生じた取引、連絡、紛争等については、登録ユーザーの責任において処理及び解決するものとし、当社の責に帰すべき場合を除き、当社はかかる事項について一切責任を負いません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>5.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、当社による本サービスの提供の中断、停止、終了、利用不能又は変更、登録ユーザーのメッセージ又は情報の削除又は消失､登録ユーザーの登録の取消、本サービスの利用によるデータの消失又は機器の故障若しくは損傷、その他本サービスに関連して登録ユーザーが被った損害につき、当社の責に帰すべき場合を除き、賠償する責任を一切負わないものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>6.    </span><a
name="OLE_LINK1"><span style='font-family:"ＭＳ Ｐ明朝",serif'>当社ウェブサイトから他のウェブサイトへのリンク又は他のウェブサイトから当社ウェブサイトへのリンクが提供されている場合でも、当社は、当社ウェブサイト以外のウェブサイト及びそこから得られる情報に関して、当社の責に帰すべき場合を除き、一切の責任を負わないものとします。</span></a></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>7.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、当社の合理的な支配の及ばない状況（火事、停電、ハッキング、コンピューター・ウィルスの侵入、地震、洪水、戦争、疫病、通商停止、ストライキ、暴動、物資及び輸送施設の確保不能、政府当局若しくは地方自治体による介入、指示若しくは要請、又は内外法令の制定若しくは改廃を含みますがこれらに限定されません。）により利用契約上の義務を履行できない場合、その状態が継続する期間中登録ユーザーに対し債務不履行責任を負わないものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>8.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>消費者契約法その他の強行法規の適用その他何らかの理由により、当社が登録ユーザーに対して損害賠償責任を負う場合においても、当社の賠償責任は、直接かつ通常の損害に限り、逸失利益、間接損害等は含まないものとし、また、損害の事由が生じた時点から遡って過去</span><span
lang=EN-US>6</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>ヶ月の期間に登録ユーザーから現実に受領した本サービスの利用料金の総額を上限とします。</span>
</p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第14条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>ユーザーの賠償等の責任</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、本規約に違反することにより、又は本サービスの利用に関連して当社に損害を与えた場合、当社に対しその損害を賠償しなければなりません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーが、本サービスに関連して他の登録ユーザーその他の第三者からクレームを受け又はそれらの者との間で紛争を生じた場合には、直ちにその内容を当社に通知するとともに、登録ユーザーの費用と責任において当該クレーム又は紛争を処理し、当社からの要請に基づき、その経過及び結果を当社に報告するものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーによる本サービスの利用に関連して、当社が、他の登録ユーザーその他の第三者から権利侵害その他の理由により何らかの請求を受けた場合は、登録ユーザーは当該請求に基づき当社が当該第三者に支払を余儀なくされた金額を賠償しなければなりません。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第15条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>秘密保持</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>本規約において「秘密情報」とは、利用契約又は本サービスに関連して、登録ユーザーが、当社より書面、口頭若しくは記録媒体等により提供若しくは開示されたか、又は知り得た、当社の技術、営業、業務、財務、組織、その他の事項に関する全ての情報を意味します。但し、</span><span
lang=EN-US>(1)</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>当社から提供若しくは開示がなされたとき又は知得したときに、既に一般に公知となっていた、又は既に知得していたもの、</span><span
lang=EN-US>(2)</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>当社から提供若しくは開示又は知得した後、自己の責めに帰せざる事由により刊行物その他により公知となったもの、</span><span
lang=EN-US>(3)</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>提供又は開示の権限のある第三者から秘密保持義務を負わされることなく適法に取得したもの、</span><span
lang=EN-US>(4)</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>秘密情報によることなく単独で開発したもの、</span><span
lang=EN-US>(5)</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>当社から秘密保持の必要なき旨書面で確認されたものについては、秘密情報から除外するものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、秘密情報を本サービスの利用の目的のみに利用するとともに、当社の書面による承諾なしに第三者に当社の秘密情報を提供、開示又は漏洩しないものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>3.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>前項の定めにかかわらず、登録ユーザーは、法律、裁判所又は政府機関の命令、要求又は要請に基づき、秘密情報を開示することができます。但し、当該命令、要求又は要請があった場合、速やかにその旨を当社に通知しなければなりません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>4.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、秘密情報を記載した文書又は磁気記録媒体等を複製する場合には、事前に当社の書面による承諾を得ることとし、複製物の管理については第</span><span
lang=EN-US>2</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項に準じて厳重に行うものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>5.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、当社から求められた場合にはいつでも、遅滞なく、当社の指示に従い、秘密情報並びに秘密情報を記載又は包含した書面その他の記録媒体物及びその全ての複製物を返却又は廃棄しなければなりません。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第16条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>個人情報等の取扱い</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社による登録ユーザーの個人情報（個人情報の保護に関する法律第</span><span
lang=EN-US>2</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条第</span><span
lang=EN-US>1</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項に定める「個人情報」を意味します。）の取扱いについては、別途定める当社のプライバシーポリシーの定めによるものとし、登録ユーザーはこのプライバシーポリシーに従って当社が登録ユーザーの個人情報を取扱うことについて同意するものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.   </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、登録ユーザーが当社に提供した情報、データ等を、個人を特定できない形での統計的な情報として、当社の裁量で、利用及び公開することができるものとし、登録ユーザーはこれに異議を述べないものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第17条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>有効期間</span></p>

<p class=a3 style='margin-bottom:7.1pt'><span style='font-family:"ＭＳ Ｐ明朝",serif'>利用契約は、登録ユーザーについて第</span><span
lang=EN-US>3</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条に基づく登録が完了した日に効力を生じ、当該登録ユーザーの登録が取り消された日又は本サービスの提供が終了した日のいずれか早い日まで、当社と登録ユーザーとの間で有効に存続するものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第18条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>本規約等の変更</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、本サービスの内容を自由に変更できるものとします。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は、本規約（当社ウェブサイトに掲載する本サービスに関するルール、諸規定等を含みます。以下本項において同じ。）を変更できるものとします。当社は、本規約を変更する場合には、変更の内容及び変更の効力発生時期を、当該効力発生時期までに当社所定の方法で告知するものとします。告知された効力発生時期以降に登録ユーザーが本サービスを利用した場合又は当社の定める期間内に登録取消の手続をとらなかった場合には、登録ユーザーは、本規約の変更に同意したものとみなします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第19条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>連絡</span><span lang=EN-US>/</span><span
style='font-family:"ＭＳ ゴシック"'>通知</span></p>

<p class=a3 style='margin-bottom:7.1pt'><span style='font-family:"ＭＳ Ｐ明朝",serif'>本サービスに関する問い合わせその他登録ユーザーから当社に対する連絡又は通知、及び本規約の変更に関する通知その他当社から登録ユーザーに対する連絡又は通知は、当社の定める方法で行うものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第20条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>本規約の譲渡等</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>1.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>登録ユーザーは、当社の書面による事前の承諾なく、利用契約上の地位又は本規約に基づく権利若しくは義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。</span></p>

<p class=a style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:19.35pt;text-indent:-19.35pt'><span lang=EN-US>2.    </span><span
style='font-family:"ＭＳ Ｐ明朝",serif'>当社は本サービスにかかる事業を第三者に譲渡（事業譲渡、会社分割その他態様の如何を問わないものとします。）した場合には、当該譲渡に伴い利用契約上の地位、本規約に基づく権利及び義務並びに登録ユーザーの登録情報その他の顧客情報を当該譲渡の譲受人に譲渡することができるものとし、登録ユーザーは、かかる譲渡につき本項において予め同意したものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第21条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>完全合意</span></p>

<p class=a3 style='margin-bottom:7.1pt'><span style='font-family:"ＭＳ Ｐ明朝",serif'>本規約は、本規約に含まれる事項に関する当社と登録ユーザーとの完全な合意を構成し、口頭又は書面を問わず、本規約に含まれる事項に関する当社と登録ユーザーとの事前の合意、表明及び了解に優先します。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第22条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>分離可能性</span></p>

<p class=a3 style='margin-bottom:7.1pt'><span style='font-family:"ＭＳ Ｐ明朝",serif'>本規約のいずれかの条項又はその一部が、消費者契約法その他の法令等により無効又は執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効又は執行不能と判断された規定の残りの部分は、継続して完全に効力を有し、当社及び登録ユーザーは、当該無効若しくは執行不能の条項又は部分を適法とし、執行力を持たせるために必要な範囲で修正し、当該無効若しくは執行不能な条項又は部分の趣旨並びに法律的及び経済的に同等の効果を確保できるように努めるものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第23条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>存続規定</span></p>

<p class=MsoNormal align=left style='text-align:left'><span style='font-family:
"ＭＳ Ｐ明朝",serif'>第</span><span lang=EN-US>4</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条第</span><span
lang=EN-US>5</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項及び第</span><span
lang=EN-US>7</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項、第</span><span
lang=EN-US>5</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条（未払がある場合に限ります。）、第</span><span
lang=EN-US>6</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条第</span><span
lang=EN-US>2</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項及び第</span><span
lang=EN-US>3</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項、第</span><span
lang=EN-US>7</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条第</span><span
lang=EN-US>2</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項、第</span><span
lang=EN-US>9</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条第</span><span
lang=EN-US>3</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項、第</span><span
lang=EN-US>10</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条、第</span><span
lang=EN-US>11</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条、第</span><span
lang=EN-US>12</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条第</span><span
lang=EN-US>2</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項、第</span><span
lang=EN-US>4</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項及び第</span><span
lang=EN-US>5</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>項、第</span><span
lang=EN-US>13</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条から第</span><span
lang=EN-US>16</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条まで、並びに第</span><span
lang=EN-US>20</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条から第</span><span
lang=EN-US>24</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条までの規定は利用契約の終了後も有効に存続するものとします。但し、第</span><span
lang=EN-US>15</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>条については、利用契約終了後</span><span
lang=EN-US>5</span><span style='font-family:"ＭＳ Ｐ明朝",serif'>年間に限り存続するものとします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第24条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>準拠法及び管轄裁判所　</span></p>

<p class=a3 style='margin-bottom:7.1pt'><span style='font-family:"ＭＳ Ｐ明朝",serif'>本規約の準拠法は日本法とし、本規約に起因し又は関連する一切の紛争については、東京地方裁判所又は東京簡易裁判所を第一審の専属的合意管轄裁判所とします。</span></p>

<p class=a2 style='margin-top:7.1pt;margin-right:0mm;margin-bottom:7.1pt;
margin-left:31.2pt'><span lang=EN-US style='letter-spacing:1.0pt;text-decoration:
none'>第25条<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span><span
style='font-family:"ＭＳ ゴシック"'>協議解決</span></p>

<p class=a3 style='margin-bottom:7.1pt'><span style='font-family:"ＭＳ Ｐ明朝",serif'>当社及び登録ユーザーは、本規約に定めのない事項又は本規約の解釈に疑義が生じた場合には、互いに信義誠実の原則に従って協議の上速やかに解決を図るものとします。</span></p>

<p class=MsoNormal align=right style='text-align:right'><span style='font-family:
"ＭＳ Ｐ明朝",serif'>【</span><span lang=EN-US>2022</span><span style='font-family:
"ＭＳ Ｐ明朝",serif'>年</span>2<span
style='font-family:"ＭＳ Ｐ明朝",serif'>月</span>1<span style='font-family:"ＭＳ Ｐ明朝",serif'>日制定】</span></p>

</div>

</body>

</html>
`;
