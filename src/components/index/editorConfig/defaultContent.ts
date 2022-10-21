export const defaultContent = `<my-h1>一级标题</my-h1>

<my-h2>二级标题</my-h2>

<my-music id="1899705498"></my-music>

<my-video src="https://fuyouplus.oss-cn-beijing.aliyuncs.com/video/zuozhu.mp4"></my-video>

<my-img src="https://fuyouplus.oss-cn-beijing.aliyuncs.com/blog-imgs/18.jpg"></my-img>

~~~js
const str = "string"
const number = 20

function toSum (a,b){
  return a + b;
}
console.log(toSum(1,2))
  ~~~
<my-p>我是本文段落</my-p>

<my-a color="#409EFFFF" size="16px" weight="bold" href="http://www.fuyouplus.cn/" line>微若蜉蝣</my-a>

      <my-tips type="info" title="小蝣说:">
      tpye的可选值有 info | warn | error | success
  </my-tips>

<my-del>我是删除线</my-del>
  <my-list>
      <li>我是li</li>
  </my-list>

<my-table height="165px">
  
      <div class="th">
        <div class="th-td">标题</div>
        <div class="th-td">内容</div>
        <div class="th-td">时间</div>
      </div>
  
      <div class="content">
  
      <div class="tr">
  
      <div class="tr-td">标题1</div>
      <div class="tr-td">内容2</div>
      <div class="tr-td">2022</div>
  
      </div>
  
      <div class="tr">
  
      <div class="tr-td">标题1</div>
      <div class="tr-td">内容2</div>
      <div class="tr-td">2022</div>
  
      </div>
  
      </div>
      </my-table>

<my-tabs tabs="Release|Video|Music">
  
      <div class="tab-item">
~~~js
const str = "string"
const number = 20

function toSum (a,b){
  return a + b;
}
console.log(toSum(1,2))
~~~
      </div>

      <div class="tab-item">
      <my-video src="https://fuyouplus.oss-cn-beijing.aliyuncs.com/video/zuozhu.mp4"></my-video>
      </div>
      <div class="tab-item">
    <my-music id="1899705498"></my-music>
      </div>
  
    </my-tabs>

<my-iframe src="https://fuyouplus.cn/" h="900px"></my-iframe>`
