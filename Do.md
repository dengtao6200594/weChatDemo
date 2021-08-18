CSS：超出文本宽度的内容省略号
单行
p{
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
    width: 250px;/*需要配合宽度来使用*/
}
多行
p{
    overflow: hidden; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 */
    display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 */
　　-webkit-box-orient: vertical;
　　-webkit-line-clamp: 3; /*用来限制在一个块元素显示的文本的行数,只有 webkit 内核的浏览器才支持 */
　　width: 250px;
}