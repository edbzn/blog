(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"9Zkz":function(t,e,i){"use strict";function n(t={}){o(t),a(t)}i.d(e,"a",function(){return n});const a=t=>{if(t.description){let e=document.getElementsByTagName("meta");for(let i=0;i<e.length;i++)(e[i].name.toLowerCase().includes("description")&&null!==e.item(i)||null!==e[i].attributes.getNamedItem("property")&&e[i].attributes.getNamedItem("property").value.includes("description"))&&e.item(i).setAttribute("content","string"==typeof t.metaDescription?t.metaDescription:t.description)}},o=t=>{let e=null;e="string"==typeof t.metaTitle?t.metaTitle:"string"==typeof t.title?t.title:"Codamit - Tech Blog";document.title=`${e}`}},ACoY:function(t,e,i){"use strict";i.d(e,"a",function(){return n});const n=i("CQbg").b`
  .field {
    margin: 10px 0;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .field input,
  .field textarea,
  .field select {
    box-sizing: border-box;
    margin-top: 6px;
    display: inline-block;
    padding: 6px 4px;
    border-radius: 2px;
    background: transparent;
    border: 1px solid #666;
  }

  .field input,
  .field textarea {
    width: 100%;
  }

  .field input:focus,
  .field textarea:focus,
  .field select:focus {
    outline: 1px solid #666;
  }

  .label {
    font-size: 0.9rem;
  }
`},wM92:function(t,e,i){"use strict";i.r(e);var n=i("NAv5"),a=i("LKA2"),o=i("CQbg"),r=i("AaG5"),s=i("fccH"),c=i("CKJH"),l=i("QQaa"),d=i("ACoY"),p=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};class m extends o.a{constructor(){super(...arguments),this.articleId=null,this.commentCollection=null,this.showEditor=!1,this.loading=!0,this.error=null}firstUpdated(){this.fetch()}async fetch(){const t=await c.a.get(`/api/v1/article/${this.articleId}/comment`);this.commentCollection=t,this.loading=!1,this.requestUpdate()}isFormValid(){if(!this.showEditor)return!1;const t=this.shadowRoot.querySelector("#name"),e=this.shadowRoot.querySelector("#comment");if(!t||!e)return!1;const i=t.value,n=e.value;return!!i&&!!n}postComment(t){t.preventDefault(),this.loading=!0,this.requestUpdate();const e={author:this.shadowRoot.querySelector("#name").value,comment:this.shadowRoot.querySelector("#comment").value,articleId:this.articleId};c.a.post(`/api/v1/article/${this.articleId}/comment`,e).then(()=>this.fetch()).then(()=>{this.showEditor=!1,this.loading=!1,this.requestUpdate()}).catch(t=>{this.error=t.message?t.message:t,this.loading=!1,this.requestUpdate()})}static get styles(){return[d.a,l.a,o.b`
        :host {
          display: block;
          margin-top: 0.6rem;
          margin-bottom: 3rem;
        }

        form[name='postComment'] {
          font-size: 1rem;
          margin: 2rem 0;
        }

        .comments {
          margin-top: 2rem;
          font-size: 1rem;
        }

        .message header em {
          font-weight: 100;
          font-size: 14px;
          text-transform: capitalize;
        }
      `]}render(){return o.c`
      <div>
        <button
          type="button"
          class="button is-primary is-block"
          @click="${()=>{this.showEditor=!this.showEditor,this.requestUpdate()}}"
        >
          ${this.showEditor?Object(s.b)("article_detail.stop_comment_btn"):Object(s.b)("article_detail.leave_comment_btn")}
        </button>
        ${this.showEditor?o.c`
              <form
                name="postComment"
                @submit=${this.postComment}
                @input=${()=>this.update(new Map)}
              >
                ${this.error?o.c`
                      <div class="notification is-danger">
                        <button
                          class="delete"
                          @click="${()=>{this.error=null,this.requestUpdate()}}"
                        ></button>
                        ${this.error}
                      </div>
                    `:r.f}
                <div class="field">
                  <label for="name">${Object(s.b)("article_detail.name_label")}</label>
                  <div class="control">
                    <input class="input" name="name" id="name" type="text" required />
                  </div>
                </div>
                <div class="field">
                  <label for="comment">${Object(s.b)("article_detail.comment_label")}</label>
                  <div class="control">
                    <textarea
                      class="textarea ${this.loading?o.c`
                            is-loading
                          `:r.f}"
                      name="comment"
                      id="comment"
                      required
                    ></textarea>
                  </div>
                </div>
                <button type="submit" ?disabled=${!this.isFormValid()} class="button">
                  ${Object(s.b)("article_detail.comment_btn")}
                </button>
              </form>
            `:r.f}
        <section class="comments">
          ${null!==this.commentCollection?this.commentCollection.collection.map(t=>o.c`
                  <article class="message">
                    <div class="message-body is-dark">
                      <header>
                        <strong>${t.author}</strong>
                        <em>
                          -
                          ${Object(n.format)(new Date(t.createdAt),"ddd DD MMM YYYY",{locale:a})}
                        </em>
                      </header>
                      ${t.comment}
                    </div>
                  </article>
                `):null}
        </section>
      </div>
    `}}(function(t,e,i,n){var a,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(r=(o<3?a(r):o>3?a(e,i,r):a(e,i))||r);o>3&&r&&Object.defineProperty(e,i,r)})([Object(o.d)({type:String}),p("design:type",Object)],m.prototype,"articleId",void 0),customElements.define("ez-article-comments",m);var h=i("W2n+"),u=i("wZee"),f=(i("gAkk"),i("ZgVT"),i("2et7"),i("QWvX"),i("85O/"),i("bPOv"),i("oNmE"),i("hnpa"),i("XIHC"),function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)});class g extends o.a{firstUpdated(){this.shadowRoot.querySelectorAll("code").forEach(t=>{u.highlightElement(t)})}static get styles(){return o.b`
      :host {
        display: block;
        font-size: 1.3rem;
      }

      iframe {
        border: none;
      }

      .content {
        margin-bottom: 3rem;
      }

      pre[class*='language-'] {
        margin: 2em 0 !important;
        line-height: 1.1;
      }

      :not(pre) > code[class*='language-'],
      pre[class*='language-'] {
        border-radius: 4px;
      }

      code .number,
      code .tag.tag:not(body) {
        align-items: inherit;
        background-color: inherit;
        border-radius: inherit;
        display: inherit;
        font-size: inherit;
        height: inherit;
        justify-content: inherit;
        margin-right: inherit;
        min-width: inherit;
        padding: inherit;
        text-align: inherit;
        vertical-align: inherit;
      }

      :not(pre) > code[class*='language-'] {
        background: rgba(255, 229, 100, 0.2) !important;
        text-shadow: none;
        color: #1a1a1a;
        padding: 0.15em 0.2em 0.05em;
        border-radius: 0px !important;
      }

      h2,
      h3,
      h4 {
        margin-top: 40px;
      }

      code {
        font-size: 1rem;
      }

      blockquote {
        font-family: 'IBM Plex Serif', serif;
        font-style: italic;
        font-size: 2rem;
        margin: 3rem 3rem;
      }

      blockquote p {
        quotes: '„ ' ' “';
      }

      blockquote p::before {
        content: open-quote;
      }
      blockquote p::after {
        content: close-quote;
      }

      a {
        color: #40a8ff;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `}render(){return o.c`
      <link href="/assets/css/atom.css" rel="stylesheet" />
      <div class="content">${Object(h.a)(this.content)}</div>
    `}}(function(t,e,i,n){var a,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(r=(o<3?a(r):o>3?a(e,i,r):a(e,i))||r);o>3&&r&&Object.defineProperty(e,i,r)})([Object(o.d)({type:String}),f("design:type",String)],g.prototype,"content",void 0),customElements.define("ez-article-content",g);var b=i("azgF"),y=i("SEiY"),v=i("pS3t");var w=i("gvQ4"),x=i("9Zkz"),j=function(t,e,i,n){var a,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(r=(o<3?a(r):o>3?a(e,i,r):a(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},O=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};class $ extends o.a{constructor(){super(...arguments),this.posterUrl=null,this.percentRemaining="0",this.article=null,this.calculateRemainingHandler=null}firstUpdated(){this.init().then(()=>{this.handleScrollChange(),this.setPageMeta()}).catch(t=>{b.a.throw(t)})}async init(){try{this.article=await this.getArticle(),this.posterUrl=this.article.posterUrl}catch(t){b.a.throw(t)}}getArticle(){return c.a.get(`/api/v1/article/slug/${this.slug}`)}handleScrollChange(){const t=document.getElementsByTagName("body").item(0);this.calculateRemainingHandler=function(t,e,i=!1){let n;return function(){const a=arguments,o=i&&!n;window.clearTimeout(n),n=window.setTimeout(()=>{n=void 0,i||t.apply(this,a)},e),o&&t.apply(this,a)}}(()=>{const e=100*window.scrollY/(t.offsetHeight-window.innerHeight);this.percentRemaining=e.toFixed()},10),window.addEventListener("scroll",this.calculateRemainingHandler)}setPageMeta(){const t="string"==typeof this.article.metaTitle?this.article.metaTitle:void 0,e="string"==typeof this.article.metaDescription?this.article.metaDescription:void 0,[i,n]=this.article.html.replace(/<\/?[^>]+(>|$)/g,"").slice(0,250).split("."),a=[i,n+"."].join(".");Object(x.a)({title:this.article.title,metaTitle:t,description:a,metaDescription:e})}disconnectedCallback(){this.removeEventListener("scroll",this.calculateRemainingHandler)}static get styles(){return[l.a,o.b`
        :host {
          position: relative;
          display: block;
        }

        .poster {
          height: 45vh;
          background-color: #eee;
          background-size: cover;
          background-position: center center;
        }

        figure {
          margin: 0;
        }

        .content .title {
          font-size: 3.4em;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header .tag {
          margin-right: 4px;
        }

        .header .tag:last-child {
          margin-right: 0;
        }

        .profile {
          margin: 0 auto;
          display: flex;
          align-items: center;
        }

        .follow-me {
          max-height: 36px;
        }

        .avatar {
          min-width: 110px;
          height: 110px;
          overflow: hidden;
          border-radius: 100%;
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
          background-color: #eee;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          margin: 0 !important;
        }

        .presentation {
          padding-left: 1.55rem;
          font-size: 0.8em;
        }

        .date {
          font-family: 'IBM Plex Sans', sans-serif;
          text-transform: capitalize;
          font-weight: 400;
          font-size: 0.8rem;
        }

        .content {
          margin-top: 40px;
        }

        .content .publication {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3rem;
        }

        .content .publication .date {
          text-transform: initial;
        }

        .content .article-footer {
          padding-bottom: 0;
          padding-left: 0;
          padding-right: 0;
        }

        .timeline {
          height: 4px;
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(155, 155, 155, 0.48);
        }

        .timeline > div {
          height: 4px;
          background-color: #40a8ff;
          transition: width cubic-bezier(0.4, 0, 0.2, 1) 200ms;
        }

        .content blockquote:not(:last-child),
        .content dl:not(:last-child),
        .content ol:not(:last-child),
        .content p:not(:last-child),
        .content pre:not(:last-child),
        .content table:not(:last-child),
        .content ul:not(:last-child) {
          margin-bottom: 1.1em !important;
        }

        @media screen and (max-width: 800px) {
          .content .title {
            font-size: 2.75em;
          }

          .header {
            align-items: initial;
            flex-direction: column-reverse;
          }
          .content .publication {
            align-items: initial;
            flex-direction: column-reverse;
          }
          .date {
            margin-bottom: 4px;
          }
          .container {
            padding: 3rem 0.8rem;
          }
        }
      `]}showArticleDetail(){const t=this.article;return o.c`
      <article class="content">
        <header class="header">
          ${Object(v.a)(t)}
          <span class="date"
            >${Object(n.format)(new Date(t.publishedAt),"dddd DD MMMM YYYY",{locale:y.a.dateFnsLocale})}
          </span>
        </header>
        <h1 class="title">${t.title}</h1>
        <ez-article-content .content="${t.html}"></ez-article-content>
        <footer class="article-footer">
          <div class="publication">
            ${Object(v.a)(t)}
            <span class="date">
              ${Object(s.b)("article_detail.published_at")}
              ${Object(n.distanceInWordsToNow)(new Date(t.publishedAt),{locale:y.a.dateFnsLocale})}
              ${"en"===y.a.getLang()?" ago":null}
            </span>
          </div>
          <ez-article-reactions .article=${t}></ez-article-reactions>
          <a href="/" class="button" @click="${Object(w.a)("/")}">
            ${Object(s.b)("article_detail.home_btn")}
          </a>
          <ez-article-comments articleId=${t._id}></ez-article-comments>
          <ez-article-author></ez-article-author>
        </footer>
      </article>
    `}render(){return o.c`
      <ez-navbar></ez-navbar>
      ${this.posterUrl?o.c`
            <figure class="poster" style="background-image: url('${this.posterUrl}')"></figure>
          `:o.c`
            <div class="poster"></div>
          `}
      <div class="timeline">
        <div style="width: ${this.percentRemaining+"%"};"></div>
      </div>
      <ez-page .navbar="${!1}">
        <section class="container">
          ${this.article?this.showArticleDetail():r.f}
        </section>
      </ez-page>
    `}}j([Object(o.d)({type:String}),O("design:type",String)],$.prototype,"slug",void 0),j([Object(o.d)({type:String}),O("design:type",Object)],$.prototype,"posterUrl",void 0),j([Object(o.d)({type:String}),O("design:type",String)],$.prototype,"percentRemaining",void 0),j([Object(o.d)({type:Object}),O("design:type",Object)],$.prototype,"article",void 0),customElements.define("ez-article-detail",$);var k=i("dJ3e"),z=function(t,e,i,n){var a,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(r=(o<3?a(r):o>3?a(e,i,r):a(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r},R=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};const _=(t,e)=>"reaction_"+t._id+"_"+e,S=(t,e)=>null===localStorage.getItem(_(t,e)),q=(t,e)=>localStorage.setItem(_(t,e),"1");class E extends o.a{constructor(){super(...arguments),this.allowed={heart:!1,unicorn:!1,mark:!1}}firstUpdated(){this.allowed={heart:S(this.article,"heart"),unicorn:S(this.article,"unicorn"),mark:S(this.article,"mark")}}async addReaction(t){if(S(this.article,t))try{await k.a.post(`/api/v1/article/${this.article._id}/reaction`,{reaction:t}),q(this.article,t),this.allowed=Object.assign({},this.allowed,{[t]:!1}),this.article.reactions.types[t].count=++this.article.reactions.types[t].count,this.requestUpdate()}catch(t){k.b.throw(t)}}static get styles(){return o.b`
      :host {
        display: block;
      }

      .reactions {
        display: flex;
        justify-content: space-around;
        padding: 18px 0;
        margin-bottom: 3rem;
      }

      .reaction {
        display: flex;
        align-items: center;
      }

      .reaction img {
        width: 28px;
        display: block;
        border-radius: 50%;
      }

      .count {
        margin-left: 8px;
      }

      .button {
        font-weight: 800;
        padding: 12px;
        width: 84px;
        height: 54px;
        cursor: pointer;
        border: 1px solid #eee;
        border-radius: 20px;
        color: #222;
        text-align: center;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}render(){return o.c`
      <section class="reactions">
        ${Object.entries(this.article.reactions.types).map(([t,e])=>o.c`
            <div class="reaction">
              <button
                .disabled="${!this.allowed[t]}"
                class="button ${this.allowed[t]?r.f:"is-primary"} is-rounded"
                type="button is-large"
                @click="${()=>this.addReaction(t)}"
              >
                <img src="/assets/images/${t}.png" />
                <span class="count">${e.count}</span>
              </button>
            </div>
          `)}
      </section>
    `}}z([Object(o.d)({type:Object}),R("design:type",Object)],E.prototype,"article",void 0),z([Object(o.d)({type:Object}),R("design:type",Object)],E.prototype,"allowed",void 0),customElements.define("ez-article-reactions",E);customElements.define("ez-article-author",class extends o.a{static get styles(){return o.b`
      .presentation {
        font-family: 'IBM Plex Sans', sans-serif;
      }
    `}render(){return o.c`
      <div class="profile">
        <figure
          class="avatar"
          style="background-image: url('/assets/images/portrait.jpg')"
        ></figure>
        <div class="presentation">
          <strong>Edouard Bozon</strong><br />
          <span>${Object(s.b)("profile.description")}</span>
          <div class="follow-me">
            <iframe
              src="https://platform.twitter.com/widgets/follow_button.html?screen_name=edouardbozon&show_screen_name=true&show_count=false"
              title="Follow me"
              width="148"
              height="26"
              style="margin-top: 12px; border: 0; overflow: hidden;"
            ></iframe>
          </div>
        </div>
      </div>
    `}})}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL3NldC1kb2N1bWVudC1tZXRhLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2hhcmVkL2Zvcm0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2FydGljbGUtZGV0YWlsL2FydGljbGUtY29tbWVudC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2FydGljbGUtZGV0YWlsL2FydGljbGUtY29udGVudC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2FydGljbGUtZGV0YWlsL2FydGljbGUtZGV0YWlsLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3V0aWxzL2RlYm91bmNlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9hcnRpY2xlLWRldGFpbC9hcnRpY2xlLXJlYWN0aW9ucy5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL2FydGljbGUtZGV0YWlsL2FydGljbGUtYXV0aG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6WyJzZXRQYWdlTWV0YSIsIm9wdHMiLCJzZXRUaXRsZSIsInNldERlc2NyaXB0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsImQiLCJfX3dlYnBhY2tfZXhwb3J0c19fIiwiZGVzY3JpcHRpb24iLCJtZXRhIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImkiLCJsZW5ndGgiLCJuYW1lIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsIml0ZW0iLCJhdHRyaWJ1dGVzIiwiZ2V0TmFtZWRJdGVtIiwidmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJtZXRhRGVzY3JpcHRpb24iLCJ0aXRsZSIsIm1ldGFUaXRsZSIsImZvcm1TdHlsZSIsImFydGljbGVfY29tbWVudF9jb21wb25lbnRfQXJ0aWNsZUNvbW1lbnRDb21wb25lbnQiLCJsaXRfZWxlbWVudCIsIltvYmplY3QgT2JqZWN0XSIsInRoaXMiLCJhcnRpY2xlSWQiLCJjb21tZW50Q29sbGVjdGlvbiIsInNob3dFZGl0b3IiLCJsb2FkaW5nIiwiZXJyb3IiLCJmZXRjaCIsImFwaV9jbGllbnQiLCJnZXQiLCJyZXF1ZXN0VXBkYXRlIiwibmFtZUN0cmwiLCJzaGFkb3dSb290IiwicXVlcnlTZWxlY3RvciIsImNvbW1lbnRDdHJsIiwiY29tbWVudCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJmb3JtRGF0YSIsImF1dGhvciIsInBvc3QiLCJ0aGVuIiwiY2F0Y2giLCJlcnIiLCJtZXNzYWdlIiwic3R5bGVzIiwic2hhcmVkX2Zvcm0iLCJzaGFyZWRfYnV0dG9uIiwiT2JqZWN0IiwidHJhbnNsYXRlX2RpcmVjdGl2ZSIsInBvc3RDb21tZW50IiwidXBkYXRlIiwiTWFwIiwibGl0X2h0bWwiLCJpc0Zvcm1WYWxpZCIsImNvbGxlY3Rpb24iLCJtYXAiLCJkYXRlX2ZucyIsIkRhdGUiLCJjcmVhdGVkQXQiLCJsb2NhbGUiLCJmciIsIl9fZGVjb3JhdGUiLCJ0eXBlIiwiU3RyaW5nIiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJhcnRpY2xlX2NvbnRlbnRfY29tcG9uZW50X0FydGljbGVDb250ZW50Q29tcG9uZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbGVtIiwicHJpc20iLCJ1bnNhZmVfaHRtbCIsImNvbnRlbnQiLCJhcnRpY2xlX2NvbnRlbnRfY29tcG9uZW50X2RlY29yYXRlIiwiYXJ0aWNsZV9kZXRhaWxfY29tcG9uZW50X0FydGljbGVEZXRhaWwiLCJwb3N0ZXJVcmwiLCJwZXJjZW50UmVtYWluaW5nIiwiYXJ0aWNsZSIsImNhbGN1bGF0ZVJlbWFpbmluZ0hhbmRsZXIiLCJpbml0IiwiaGFuZGxlU2Nyb2xsQ2hhbmdlIiwiZSIsImVycm9yX2hhbmRsZXJfc2VydmljZSIsInRocm93IiwiZ2V0QXJ0aWNsZSIsInNsdWciLCJib2R5IiwiZnVuYyIsIndhaXQiLCJpbW1lZGlhdGUiLCJ0aW1lb3V0IiwiYXJncyIsImFyZ3VtZW50cyIsImNhbGxOb3ciLCJ3aW5kb3ciLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwidW5kZWZpbmVkIiwiYXBwbHkiLCJkZWJvdW5jZSIsInNjcm9sbFkiLCJvZmZzZXRIZWlnaHQiLCJpbm5lckhlaWdodCIsInRvRml4ZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZmlyc3RTZW50ZW5jZSIsInNlY29uZFNlbnRlbmNlIiwiaHRtbCIsInJlcGxhY2UiLCJzbGljZSIsInNwbGl0Iiwiam9pbiIsInNldF9kb2N1bWVudF9tZXRhIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRhZ3MiLCJwdWJsaXNoZWRBdCIsImxhbmd1YWdlX3NlcnZpY2UiLCJkYXRlRm5zTG9jYWxlIiwiZ2V0TGFuZyIsInV0aWxzX25hdmlnYXRlIiwiX2lkIiwic2hvd0FydGljbGVEZXRhaWwiLCJhcnRpY2xlX2RldGFpbF9jb21wb25lbnRfZGVjb3JhdGUiLCJjcmVhdGVSZWFjdGlvbktleSIsInJlYWN0aW9uIiwiaXNBbGxvd2VkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImRpc2FsbG93Iiwic2V0SXRlbSIsImFydGljbGVfcmVhY3Rpb25zX2NvbXBvbmVudF9BcnRpY2xlUmVhY3Rpb25zQ29tcG9uZW50IiwiYWxsb3dlZCIsImhlYXJ0IiwidW5pY29ybiIsIm1hcmsiLCJzZXJ2aWNlcyIsImFzc2lnbiIsInJlYWN0aW9ucyIsInR5cGVzIiwiY291bnQiLCJlbnRyaWVzIiwiYWRkUmVhY3Rpb24iLCJhcnRpY2xlX3JlYWN0aW9uc19jb21wb25lbnRfZGVjb3JhdGUiXSwibWFwcGluZ3MiOiI2RkFPTyxTQUFTQSxFQUFZQyxFQUFxQixJQUMvQ0MsRUFBU0QsR0FDVEUsRUFBZUYsR0FGakJHLEVBQUFDLEVBQUFDLEVBQUEsc0JBQUFOLElBS0EsTUFBTUcsRUFBa0JGLElBQ3RCLEdBQUlBLEVBQUtNLFlBQWEsQ0FDcEIsSUFBSUMs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SUFBVyxJQUM5Q3hHLEtBQUt5RCxRQUFRNEQsVUFBVUMsTUFBTWQsR0FBVWUsUUFBVXZILEtBQUt5RCxRQUFRNEQsVUFBVUMsTUFBTWQsR0FBVWUsTUFDeEZ2SCxLQUFLUyxnQkFDTCxNQUFPSixHQUNQOEcsRUFBQSxFQUFvQnBELE1BQU0xRCxJQUk5Qm1CLG9CQUNFLE9BQU8xQixFQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUE2Q1RDLFNBQ0UsT0FBT0QsRUFBQTs7VUFFRDZCLE9BQU82RixRQUFReEgsS0FBS3lELFFBQVM0RCxVQUFVQyxPQUFPbkYsSUFDOUMsRUFBRU8sRUFBTThELEtBQWMxRyxFQUFBOzs7OEJBR0ZFLEtBQUsrRyxRQUFzQnJFO2dDQUN4QjFDLEtBQUsrRyxRQUFzQnJFLEdBRXhDVixFQUFBLEVBREE7OzBCQUdNLElBQU1oQyxLQUFLeUgsWUFBWS9FOzsyQ0FFTkE7c0NBQ0w4RCxFQUFTZTs7Ozs7T0FoRzdDRyxFQUFBLENBREMvRixPQUFBN0IsRUFBQSxFQUFBNkIsQ0FBUyxDQUFFZSxLQUFNZixnRUFJbEIrRixFQUFBLENBREMvRixPQUFBN0IsRUFBQSxFQUFBNkIsQ0FBUyxDQUFFZSxLQUFNZixnRUF3R3BCaUIsZUFBZUMsT0FBTyx1QkFBd0JpRSxHQ3RGOUNsRSxlQUFlQyxPQUFPLG9CQWxDUCxjQUFxQy9DLEVBQUEsRUFDbEQwQixvQkFDRSxPQUFPMUIsRUFBQTs7OztNQU9UQyxTQUNFLE9BQU9ELEVBQUE7Ozs7Ozs7O2tCQVFPNkIsT0FBQUMsRUFBQSxFQUFBRCxDQUFVIiwiZmlsZSI6ImFwcC1hcnRpY2xlLmZmN2UzYjVmYjE2N2U3ZDA3NzhhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIE1ldGFEYXRhT3B0cyB7XG4gIHRpdGxlPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgbWV0YVRpdGxlPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBtZXRhRGVzY3JpcHRpb24/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQYWdlTWV0YShvcHRzOiBNZXRhRGF0YU9wdHMgPSB7fSk6IHZvaWQge1xuICBzZXRUaXRsZShvcHRzKTtcbiAgc2V0RGVzY3JpcHRpb24ob3B0cyk7XG59XG5cbmNvbnN0IHNldERlc2NyaXB0aW9uID0gKG9wdHM6IE1ldGFEYXRhT3B0cyk6IHZvaWQgPT4ge1xuICBpZiAob3B0cy5kZXNjcmlwdGlvbikge1xuICAgIGxldCBtZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ21ldGEnKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWV0YS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICAobWV0YVtpXS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2Rlc2NyaXB0aW9uJykgJiYgbWV0YS5pdGVtKGkpICE9PSBudWxsKSB8fFxuICAgICAgICAobWV0YVtpXS5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgncHJvcGVydHknKSAhPT0gbnVsbCAmJlxuICAgICAgICAgIG1ldGFbaV0uYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oJ3Byb3BlcnR5JykhLnZhbHVlLmluY2x1ZGVzKCdkZXNjcmlwdGlvbicpKVxuICAgICAgKSB7XG4gICAgICAgIChtZXRhLml0ZW0oaSkgYXMgSFRNTE1ldGFFbGVtZW50KS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgJ2NvbnRlbnQnLFxuICAgICAgICAgIHR5cGVvZiBvcHRzLm1ldGFEZXNjcmlwdGlvbiA9PT0gJ3N0cmluZycgPyBvcHRzLm1ldGFEZXNjcmlwdGlvbiA6IG9wdHMuZGVzY3JpcHRpb25cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHNldFRpdGxlID0gKG9wdHM6IE1ldGFEYXRhT3B0cyk6IHZvaWQgPT4ge1xuICBsZXQgdGl0bGUgPSBudWxsO1xuICBpZiAodHlwZW9mIG9wdHMubWV0YVRpdGxlID09PSAnc3RyaW5nJykge1xuICAgIHRpdGxlID0gb3B0cy5tZXRhVGl0bGU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMudGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgdGl0bGUgPSBvcHRzLnRpdGxlO1xuICB9IGVsc2Uge1xuICAgIHRpdGxlID0gJ0NvZGFtaXQgLSBUZWNoIEJsb2cnO1xuICB9XG5cbiAgY29uc3QgcHJlZml4ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICdbREVWXSAtICcgOiAnJztcbiAgZG9jdW1lbnQudGl0bGUgPSBgJHtwcmVmaXh9JHt0aXRsZX1gO1xufTtcbiIsImltcG9ydCB7IGNzcyB9IGZyb20gJ2xpdC1lbGVtZW50JztcblxuZXhwb3J0IGNvbnN0IGZvcm1TdHlsZSA9IGNzc2BcbiAgLmZpZWxkIHtcbiAgICBtYXJnaW46IDEwcHggMDtcbiAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IFNhbnMnLCBzYW5zLXNlcmlmO1xuICB9XG5cbiAgLmZpZWxkIGlucHV0LFxuICAuZmllbGQgdGV4dGFyZWEsXG4gIC5maWVsZCBzZWxlY3Qge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgbWFyZ2luLXRvcDogNnB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwYWRkaW5nOiA2cHggNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNjY2O1xuICB9XG5cbiAgLmZpZWxkIGlucHV0LFxuICAuZmllbGQgdGV4dGFyZWEge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLmZpZWxkIGlucHV0OmZvY3VzLFxuICAuZmllbGQgdGV4dGFyZWE6Zm9jdXMsXG4gIC5maWVsZCBzZWxlY3Q6Zm9jdXMge1xuICAgIG91dGxpbmU6IDFweCBzb2xpZCAjNjY2O1xuICB9XG5cbiAgLmxhYmVsIHtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgfVxuYDtcbiIsImltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCAqIGFzIGZyTG9jYWxlIGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9mcic7XG5pbXBvcnQgeyBjc3MsIGh0bWwsIExpdEVsZW1lbnQsIHByb3BlcnR5IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuaW1wb3J0IHsgbm90aGluZyB9IGZyb20gJ2xpdC1odG1sJztcblxuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAnLi4vLi4vY29yZS9kaXJlY3RpdmVzL3RyYW5zbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgYXBpQ2xpZW50IH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9hcGktY2xpZW50JztcbmltcG9ydCB7IGJ1dHRvblN0eWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2J1dHRvbic7XG5pbXBvcnQgeyBSZXNvdXJjZUNvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGZvcm1TdHlsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mb3JtJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJ0aWNsZUNvbW1lbnRDb21wb25lbnQgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIGFydGljbGVJZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgY29tbWVudENvbGxlY3Rpb246IFJlc291cmNlQ29sbGVjdGlvbjxDb21tZW50PiB8IG51bGwgPSBudWxsO1xuXG4gIHNob3dFZGl0b3IgPSBmYWxzZTtcblxuICBsb2FkaW5nID0gdHJ1ZTtcblxuICBlcnJvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgZmlyc3RVcGRhdGVkKCkge1xuICAgIHRoaXMuZmV0Y2goKTtcbiAgfVxuXG4gIGFzeW5jIGZldGNoKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNvbW1lbnRDb2xsZWN0aW9uID0gYXdhaXQgYXBpQ2xpZW50LmdldDxSZXNvdXJjZUNvbGxlY3Rpb248Q29tbWVudD4+KFxuICAgICAgYC9hcGkvdjEvYXJ0aWNsZS8ke3RoaXMuYXJ0aWNsZUlkfS9jb21tZW50YFxuICAgICk7XG5cbiAgICB0aGlzLmNvbW1lbnRDb2xsZWN0aW9uID0gY29tbWVudENvbGxlY3Rpb247XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gIH1cblxuICBpc0Zvcm1WYWxpZCgpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuc2hvd0VkaXRvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5hbWVDdHJsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcjbmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgY29tbWVudEN0cmwgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50JykgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcblxuICAgIGlmICghbmFtZUN0cmwgfHwgIWNvbW1lbnRDdHJsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgbmFtZSA9IG5hbWVDdHJsLnZhbHVlO1xuICAgIGNvbnN0IGNvbW1lbnQgPSBjb21tZW50Q3RybC52YWx1ZTtcblxuICAgIHJldHVybiAhIW5hbWUgJiYgISFjb21tZW50O1xuICB9XG5cbiAgcG9zdENvbW1lbnQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMucmVxdWVzdFVwZGF0ZSgpO1xuXG4gICAgY29uc3QgbmFtZSA9ICh0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJyNuYW1lJykgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgY29uc3QgY29tbWVudCA9ICh0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50JykgYXMgSFRNTFRleHRBcmVhRWxlbWVudCkudmFsdWU7XG4gICAgY29uc3QgZm9ybURhdGEgPSB7IGF1dGhvcjogbmFtZSwgY29tbWVudCwgYXJ0aWNsZUlkOiB0aGlzLmFydGljbGVJZCB9O1xuXG4gICAgYXBpQ2xpZW50XG4gICAgICAucG9zdDxSZXNvdXJjZUNvbGxlY3Rpb248Q29tbWVudD4+KGAvYXBpL3YxL2FydGljbGUvJHt0aGlzLmFydGljbGVJZH0vY29tbWVudGAsIGZvcm1EYXRhKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5mZXRjaCgpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dFZGl0b3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyLm1lc3NhZ2UgPyBlcnIubWVzc2FnZSA6IGVycjtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0eWxlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgZm9ybVN0eWxlLFxuICAgICAgYnV0dG9uU3R5bGUsXG4gICAgICBjc3NgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICBtYXJnaW4tdG9wOiAwLjZyZW07XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogM3JlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1bbmFtZT0ncG9zdENvbW1lbnQnXSB7XG4gICAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICAgIG1hcmdpbjogMnJlbSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbW1lbnRzIHtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdlIGhlYWRlciBlbSB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gICAgICAgIH1cbiAgICAgIGAsXG4gICAgXTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxkaXY+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1wcmltYXJ5IGlzLWJsb2NrXCJcbiAgICAgICAgICBAY2xpY2s9XCIkeygpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0VkaXRvciA9ICF0aGlzLnNob3dFZGl0b3I7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICAgICAgICB9fVwiXG4gICAgICAgID5cbiAgICAgICAgICAkeyF0aGlzLnNob3dFZGl0b3JcbiAgICAgICAgICAgID8gdHJhbnNsYXRlKCdhcnRpY2xlX2RldGFpbC5sZWF2ZV9jb21tZW50X2J0bicpXG4gICAgICAgICAgICA6IHRyYW5zbGF0ZSgnYXJ0aWNsZV9kZXRhaWwuc3RvcF9jb21tZW50X2J0bicpfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgJHt0aGlzLnNob3dFZGl0b3JcbiAgICAgICAgICA/IGh0bWxgXG4gICAgICAgICAgICAgIDxmb3JtXG4gICAgICAgICAgICAgICAgbmFtZT1cInBvc3RDb21tZW50XCJcbiAgICAgICAgICAgICAgICBAc3VibWl0PSR7dGhpcy5wb3N0Q29tbWVudH1cbiAgICAgICAgICAgICAgICBAaW5wdXQ9JHsoKSA9PiB0aGlzLnVwZGF0ZShuZXcgTWFwKCkpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgJHt0aGlzLmVycm9yXG4gICAgICAgICAgICAgICAgICA/IGh0bWxgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmaWNhdGlvbiBpcy1kYW5nZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkZWxldGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCIkeygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmVycm9yfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgICA6IG5vdGhpbmd9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibmFtZVwiPiR7dHJhbnNsYXRlKCdhcnRpY2xlX2RldGFpbC5uYW1lX2xhYmVsJyl9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgbmFtZT1cIm5hbWVcIiBpZD1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjb21tZW50XCI+JHt0cmFuc2xhdGUoJ2FydGljbGVfZGV0YWlsLmNvbW1lbnRfbGFiZWwnKX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0YXJlYSAke3RoaXMubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBodG1sYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzLWxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBub3RoaW5nfVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImNvbW1lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgIGlkPVwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiA/ZGlzYWJsZWQ9JHshdGhpcy5pc0Zvcm1WYWxpZCgpfSBjbGFzcz1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgJHt0cmFuc2xhdGUoJ2FydGljbGVfZGV0YWlsLmNvbW1lbnRfYnRuJyl9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICA6IG5vdGhpbmd9XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29tbWVudHNcIj5cbiAgICAgICAgICAke3RoaXMuY29tbWVudENvbGxlY3Rpb24gIT09IG51bGxcbiAgICAgICAgICAgID8gdGhpcy5jb21tZW50Q29sbGVjdGlvbi5jb2xsZWN0aW9uLm1hcChcbiAgICAgICAgICAgICAgICBjb21tZW50ID0+IGh0bWxgXG4gICAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cIm1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm9keSBpcy1kYXJrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+JHtjb21tZW50LmF1dGhvcn08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAke2Zvcm1hdChuZXcgRGF0ZShjb21tZW50LmNyZWF0ZWRBdCksICdkZGQgREQgTU1NIFlZWVknLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlOiBmckxvY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2VtPlxuICAgICAgICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICR7Y29tbWVudC5jb21tZW50fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2V6LWFydGljbGUtY29tbWVudHMnLCBBcnRpY2xlQ29tbWVudENvbXBvbmVudCk7XG4iLCJpbXBvcnQgeyBjc3MsIGh0bWwsIExpdEVsZW1lbnQsIHByb3BlcnR5IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuaW1wb3J0IHsgdW5zYWZlSFRNTCB9IGZyb20gJ2xpdC1odG1sL2RpcmVjdGl2ZXMvdW5zYWZlLWh0bWwnO1xuaW1wb3J0ICogYXMgUHJpc20gZnJvbSAncHJpc21qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1iYXNoJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1kb2NrZXInO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YXNjcmlwdCc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qc29uJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cCc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1uZ2lueCc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zY3NzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXR5cGVzY3JpcHQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnRpY2xlQ29udGVudENvbXBvbmVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgY29udGVudDogc3RyaW5nO1xuXG4gIGZpcnN0VXBkYXRlZCgpIHtcbiAgICAodGhpcy5zaGFkb3dSb290IGFzIFNoYWRvd1Jvb3QpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvZGUnKS5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgUHJpc20uaGlnaGxpZ2h0RWxlbWVudChlbGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3R5bGVzKCkge1xuICAgIHJldHVybiBjc3NgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBmb250LXNpemU6IDEuM3JlbTtcbiAgICAgIH1cblxuICAgICAgaWZyYW1lIHtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgfVxuXG4gICAgICAuY29udGVudCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDNyZW07XG4gICAgICB9XG5cbiAgICAgIHByZVtjbGFzcyo9J2xhbmd1YWdlLSddIHtcbiAgICAgICAgbWFyZ2luOiAyZW0gMCAhaW1wb3J0YW50O1xuICAgICAgICBsaW5lLWhlaWdodDogMS4xO1xuICAgICAgfVxuXG4gICAgICA6bm90KHByZSkgPiBjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10sXG4gICAgICBwcmVbY2xhc3MqPSdsYW5ndWFnZS0nXSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIH1cblxuICAgICAgY29kZSAubnVtYmVyLFxuICAgICAgY29kZSAudGFnLnRhZzpub3QoYm9keSkge1xuICAgICAgICBhbGlnbi1pdGVtczogaW5oZXJpdDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcbiAgICAgICAgZGlzcGxheTogaW5oZXJpdDtcbiAgICAgICAgZm9udC1zaXplOiBpbmhlcml0O1xuICAgICAgICBoZWlnaHQ6IGluaGVyaXQ7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogaW5oZXJpdDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBpbmhlcml0O1xuICAgICAgICBtaW4td2lkdGg6IGluaGVyaXQ7XG4gICAgICAgIHBhZGRpbmc6IGluaGVyaXQ7XG4gICAgICAgIHRleHQtYWxpZ246IGluaGVyaXQ7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBpbmhlcml0O1xuICAgICAgfVxuXG4gICAgICA6bm90KHByZSkgPiBjb2RlW2NsYXNzKj0nbGFuZ3VhZ2UtJ10ge1xuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjI5LCAxMDAsIDAuMikgIWltcG9ydGFudDtcbiAgICAgICAgdGV4dC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIGNvbG9yOiAjMWExYTFhO1xuICAgICAgICBwYWRkaW5nOiAwLjE1ZW0gMC4yZW0gMC4wNWVtO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbiAgICAgIH1cblxuICAgICAgaDIsXG4gICAgICBoMyxcbiAgICAgIGg0IHtcbiAgICAgICAgbWFyZ2luLXRvcDogNDBweDtcbiAgICAgIH1cblxuICAgICAgY29kZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIH1cblxuICAgICAgYmxvY2txdW90ZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggU2VyaWYnLCBzZXJpZjtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICAgIG1hcmdpbjogM3JlbSAzcmVtO1xuICAgICAgfVxuXG4gICAgICBibG9ja3F1b3RlIHAge1xuICAgICAgICBxdW90ZXM6ICfigJ4gJyAnIOKAnCc7XG4gICAgICB9XG5cbiAgICAgIGJsb2NrcXVvdGUgcDo6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogb3Blbi1xdW90ZTtcbiAgICAgIH1cbiAgICAgIGJsb2NrcXVvdGUgcDo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBjbG9zZS1xdW90ZTtcbiAgICAgIH1cblxuICAgICAgYSB7XG4gICAgICAgIGNvbG9yOiAjNDBhOGZmO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIGE6aG92ZXIge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBodG1sYFxuICAgICAgPGxpbmsgaHJlZj1cIi9hc3NldHMvY3NzL2F0b20uY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPiR7dW5zYWZlSFRNTCh0aGlzLmNvbnRlbnQpfTwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdlei1hcnRpY2xlLWNvbnRlbnQnLCBBcnRpY2xlQ29udGVudENvbXBvbmVudCk7XG4iLCJpbXBvcnQgeyBkaXN0YW5jZUluV29yZHNUb05vdywgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgY3NzLCBodG1sLCBMaXRFbGVtZW50LCBwcm9wZXJ0eSB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmltcG9ydCB7IG5vdGhpbmcgfSBmcm9tICdsaXQtaHRtbCc7XG5cbmltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJy4uLy4uL2NvcmUvZGlyZWN0aXZlcy90cmFuc2xhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IGFwaUNsaWVudCB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvYXBpLWNsaWVudCc7XG5pbXBvcnQgeyBlcnJvckhhbmRsZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9lcnJvci1oYW5kbGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgbGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9sYW5ndWFnZS1zZXJ2aWNlJztcbmltcG9ydCB7IGJ1dHRvblN0eWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2J1dHRvbic7XG5pbXBvcnQgeyB0YWdzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3RhZ3MnO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICcuLi8uLi91dGlscy9kZWJvdW5jZSc7XG5pbXBvcnQgeyBuYXZpZ2F0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL25hdmlnYXRlJztcbmltcG9ydCB7IHNldFBhZ2VNZXRhIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2V0LWRvY3VtZW50LW1ldGEnO1xuaW1wb3J0IHsgQXJ0aWNsZSB9IGZyb20gJy4uL2FkbWluL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJ0aWNsZURldGFpbCBleHRlbmRzIExpdEVsZW1lbnQge1xuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgc2x1Zzogc3RyaW5nO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICBwb3N0ZXJVcmw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICBwZXJjZW50UmVtYWluaW5nOiBzdHJpbmcgPSAnMCc7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogT2JqZWN0IH0pXG4gIGFydGljbGU6IEFydGljbGUgfCBudWxsID0gbnVsbDtcblxuICBjYWxjdWxhdGVSZW1haW5pbmdIYW5kbGVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0IHwgbnVsbCA9IG51bGw7XG5cbiAgZmlyc3RVcGRhdGVkKCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdCgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlU2Nyb2xsQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMuc2V0UGFnZU1ldGEoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlclNlcnZpY2UudGhyb3coZSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYXJ0aWNsZSA9IGF3YWl0IHRoaXMuZ2V0QXJ0aWNsZSgpO1xuICAgICAgdGhpcy5wb3N0ZXJVcmwgPSB0aGlzLmFydGljbGUucG9zdGVyVXJsO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlcnJvckhhbmRsZXJTZXJ2aWNlLnRocm93KGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBnZXRBcnRpY2xlKCk6IFByb21pc2U8QXJ0aWNsZT4ge1xuICAgIHJldHVybiBhcGlDbGllbnQuZ2V0PEFydGljbGU+KGAvYXBpL3YxL2FydGljbGUvc2x1Zy8ke3RoaXMuc2x1Z31gKTtcbiAgfVxuXG4gIGhhbmRsZVNjcm9sbENoYW5nZSgpOiB2b2lkIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApIGFzIEhUTUxCb2R5RWxlbWVudDtcblxuICAgIHRoaXMuY2FsY3VsYXRlUmVtYWluaW5nSGFuZGxlciA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgY29uc3QgdG90YWxIZWlnaHQgPSBib2R5Lm9mZnNldEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgY29uc3QgcGVyY2VudFJlbWFpbmluZyA9IChjdXJyZW50UG9zaXRpb24gKiAxMDApIC8gdG90YWxIZWlnaHQ7XG4gICAgICB0aGlzLnBlcmNlbnRSZW1haW5pbmcgPSBwZXJjZW50UmVtYWluaW5nLnRvRml4ZWQoKTtcbiAgICB9LCAxMCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5jYWxjdWxhdGVSZW1haW5pbmdIYW5kbGVyKTtcbiAgfVxuXG4gIHNldFBhZ2VNZXRhKCkge1xuICAgIGNvbnN0IG1ldGFUaXRsZSA9XG4gICAgICB0eXBlb2YgdGhpcy5hcnRpY2xlIS5tZXRhVGl0bGUgPT09ICdzdHJpbmcnID8gdGhpcy5hcnRpY2xlIS5tZXRhVGl0bGUhIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG1ldGFEZXNjcmlwdGlvbiA9XG4gICAgICB0eXBlb2YgdGhpcy5hcnRpY2xlIS5tZXRhRGVzY3JpcHRpb24gPT09ICdzdHJpbmcnXG4gICAgICAgID8gdGhpcy5hcnRpY2xlIS5tZXRhRGVzY3JpcHRpb24hXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgW2ZpcnN0U2VudGVuY2UsIHNlY29uZFNlbnRlbmNlXSA9IHRoaXMuYXJ0aWNsZSEuaHRtbC5yZXBsYWNlKC88XFwvP1tePl0rKD58JCkvZywgJycpXG4gICAgICAuc2xpY2UoMCwgMjUwKVxuICAgICAgLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBbZmlyc3RTZW50ZW5jZSwgc2Vjb25kU2VudGVuY2UgKyAnLiddLmpvaW4oJy4nKTtcblxuICAgIHNldFBhZ2VNZXRhKHtcbiAgICAgIHRpdGxlOiB0aGlzLmFydGljbGUhLnRpdGxlLFxuICAgICAgbWV0YVRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBtZXRhRGVzY3JpcHRpb24sXG4gICAgfSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXNcbiAgICAgIC5jYWxjdWxhdGVSZW1haW5pbmdIYW5kbGVyIGFzIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGJ1dHRvblN0eWxlLFxuICAgICAgY3NzYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgLnBvc3RlciB7XG4gICAgICAgICAgaGVpZ2h0OiA0NXZoO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gICAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZmlndXJlIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIH1cblxuICAgICAgICAuY29udGVudCAudGl0bGUge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMy40ZW07XG4gICAgICAgIH1cblxuICAgICAgICAuaGVhZGVyIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICB9XG5cbiAgICAgICAgLmhlYWRlciAudGFnIHtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5oZWFkZXIgLnRhZzpsYXN0LWNoaWxkIHtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAucHJvZmlsZSB7XG4gICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmZvbGxvdy1tZSB7XG4gICAgICAgICAgbWF4LWhlaWdodDogMzZweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5hdmF0YXIge1xuICAgICAgICAgIG1pbi13aWR0aDogMTEwcHg7XG4gICAgICAgICAgaGVpZ2h0OiAxMTBweDtcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgICAgYm94LXNoYWRvdzogMnB4IDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgICAgICAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAucHJlc2VudGF0aW9uIHtcbiAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDEuNTVyZW07XG4gICAgICAgICAgZm9udC1zaXplOiAwLjhlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5kYXRlIHtcbiAgICAgICAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IFNhbnMnLCBzYW5zLXNlcmlmO1xuICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgIH1cblxuICAgICAgICAuY29udGVudCB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogNDBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250ZW50IC5wdWJsaWNhdGlvbiB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAzcmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRlbnQgLnB1YmxpY2F0aW9uIC5kYXRlIHtcbiAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogaW5pdGlhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250ZW50IC5hcnRpY2xlLWZvb3RlciB7XG4gICAgICAgICAgcGFkZGluZy1ib3R0b206IDA7XG4gICAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAudGltZWxpbmUge1xuICAgICAgICAgIGhlaWdodDogNHB4O1xuICAgICAgICAgIHBvc2l0aW9uOiBzdGlja3k7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIHotaW5kZXg6IDEwO1xuICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMTU1LCAxNTUsIDE1NSwgMC40OCk7XG4gICAgICAgIH1cblxuICAgICAgICAudGltZWxpbmUgPiBkaXYge1xuICAgICAgICAgIGhlaWdodDogNHB4O1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM0MGE4ZmY7XG4gICAgICAgICAgdHJhbnNpdGlvbjogd2lkdGggY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSAyMDBtcztcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250ZW50IGJsb2NrcXVvdGU6bm90KDpsYXN0LWNoaWxkKSxcbiAgICAgICAgLmNvbnRlbnQgZGw6bm90KDpsYXN0LWNoaWxkKSxcbiAgICAgICAgLmNvbnRlbnQgb2w6bm90KDpsYXN0LWNoaWxkKSxcbiAgICAgICAgLmNvbnRlbnQgcDpub3QoOmxhc3QtY2hpbGQpLFxuICAgICAgICAuY29udGVudCBwcmU6bm90KDpsYXN0LWNoaWxkKSxcbiAgICAgICAgLmNvbnRlbnQgdGFibGU6bm90KDpsYXN0LWNoaWxkKSxcbiAgICAgICAgLmNvbnRlbnQgdWw6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMS4xZW0gIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDgwMHB4KSB7XG4gICAgICAgICAgLmNvbnRlbnQgLnRpdGxlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMi43NWVtO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5oZWFkZXIge1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGluaXRpYWw7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC5jb250ZW50IC5wdWJsaWNhdGlvbiB7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogaW5pdGlhbDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLmRhdGUge1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDNyZW0gMC44cmVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYCxcbiAgICBdO1xuICB9XG5cbiAgc2hvd0FydGljbGVEZXRhaWwoKSB7XG4gICAgY29uc3QgYXJ0aWNsZSA9IHRoaXMuYXJ0aWNsZSE7XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxhcnRpY2xlIGNsYXNzPVwiY29udGVudFwiPlxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgJHt0YWdzKGFydGljbGUpfVxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0ZVwiXG4gICAgICAgICAgICA+JHtmb3JtYXQobmV3IERhdGUoYXJ0aWNsZS5wdWJsaXNoZWRBdCEpLCAnZGRkZCBERCBNTU1NIFlZWVknLCB7XG4gICAgICAgICAgICAgIGxvY2FsZTogbGFuZ3VhZ2VTZXJ2aWNlLmRhdGVGbnNMb2NhbGUsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvaGVhZGVyPlxuICAgICAgICA8aDEgY2xhc3M9XCJ0aXRsZVwiPiR7YXJ0aWNsZS50aXRsZX08L2gxPlxuICAgICAgICA8ZXotYXJ0aWNsZS1jb250ZW50IC5jb250ZW50PVwiJHthcnRpY2xlLmh0bWx9XCI+PC9lei1hcnRpY2xlLWNvbnRlbnQ+XG4gICAgICAgIDxmb290ZXIgY2xhc3M9XCJhcnRpY2xlLWZvb3RlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdWJsaWNhdGlvblwiPlxuICAgICAgICAgICAgJHt0YWdzKGFydGljbGUpfVxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlXCI+XG4gICAgICAgICAgICAgICR7dHJhbnNsYXRlKCdhcnRpY2xlX2RldGFpbC5wdWJsaXNoZWRfYXQnKX1cbiAgICAgICAgICAgICAgJHtkaXN0YW5jZUluV29yZHNUb05vdyhuZXcgRGF0ZShhcnRpY2xlLnB1Ymxpc2hlZEF0ISksIHtcbiAgICAgICAgICAgICAgICBsb2NhbGU6IGxhbmd1YWdlU2VydmljZS5kYXRlRm5zTG9jYWxlLFxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgJHtsYW5ndWFnZVNlcnZpY2UuZ2V0TGFuZygpID09PSAnZW4nID8gJyBhZ28nIDogbnVsbH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZXotYXJ0aWNsZS1yZWFjdGlvbnMgLmFydGljbGU9JHthcnRpY2xlfT48L2V6LWFydGljbGUtcmVhY3Rpb25zPlxuICAgICAgICAgIDxhIGhyZWY9XCIvXCIgY2xhc3M9XCJidXR0b25cIiBAY2xpY2s9XCIke25hdmlnYXRlKCcvJyl9XCI+XG4gICAgICAgICAgICAke3RyYW5zbGF0ZSgnYXJ0aWNsZV9kZXRhaWwuaG9tZV9idG4nKX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGV6LWFydGljbGUtY29tbWVudHMgYXJ0aWNsZUlkPSR7YXJ0aWNsZS5faWR9PjwvZXotYXJ0aWNsZS1jb21tZW50cz5cbiAgICAgICAgICA8ZXotYXJ0aWNsZS1hdXRob3I+PC9lei1hcnRpY2xlLWF1dGhvcj5cbiAgICAgICAgPC9mb290ZXI+XG4gICAgICA8L2FydGljbGU+XG4gICAgYDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxlei1uYXZiYXI+PC9lei1uYXZiYXI+XG4gICAgICAke3RoaXMucG9zdGVyVXJsXG4gICAgICAgID8gaHRtbGBcbiAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJwb3N0ZXJcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnJHt0aGlzLnBvc3RlclVybH0nKVwiPjwvZmlndXJlPlxuICAgICAgICAgIGBcbiAgICAgICAgOiBodG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3RlclwiPjwvZGl2PlxuICAgICAgICAgIGB9XG4gICAgICA8ZGl2IGNsYXNzPVwidGltZWxpbmVcIj5cbiAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAke3RoaXMucGVyY2VudFJlbWFpbmluZyArICclJ307XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxlei1wYWdlIC5uYXZiYXI9XCIke2ZhbHNlfVwiPlxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICR7dGhpcy5hcnRpY2xlID8gdGhpcy5zaG93QXJ0aWNsZURldGFpbCgpIDogbm90aGluZ31cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9lei1wYWdlPlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdlei1hcnRpY2xlLWRldGFpbCcsIEFydGljbGVEZXRhaWwpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmM6IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIsIGltbWVkaWF0ZSA9IGZhbHNlKSB7XG4gIGxldCB0aW1lb3V0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHRoaXM6IGFueSkge1xuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgY29uc3QgbGF0ZXIgPSAoKSA9PiB7XG4gICAgICB0aW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cbiAgICBpZiAoY2FsbE5vdykge1xuICAgICAgZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgeyBjc3MsIGh0bWwsIExpdEVsZW1lbnQsIHByb3BlcnR5IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuaW1wb3J0IHsgbm90aGluZyB9IGZyb20gJ2xpdC1odG1sJztcblxuaW1wb3J0IHsgUmVhY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmVyL3NyYy9hcGkvYXJ0aWNsZS9tb2RlbC9hcnRpY2xlLXJlYWN0aW9ucyc7XG5pbXBvcnQgeyBhcGlDbGllbnQsIGVycm9ySGFuZGxlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IEFydGljbGUgfSBmcm9tICcuLi9hZG1pbi90eXBlcyc7XG5cbmNvbnN0IGNyZWF0ZVJlYWN0aW9uS2V5ID0gKGFydGljbGU6IEFydGljbGUsIHJlYWN0aW9uOiBSZWFjdGlvblR5cGUpID0+XG4gICdyZWFjdGlvbl8nICsgYXJ0aWNsZS5faWQgKyAnXycgKyByZWFjdGlvbjtcblxuY29uc3QgaXNBbGxvd2VkID0gKGFydGljbGU6IEFydGljbGUsIHJlYWN0aW9uOiBSZWFjdGlvblR5cGUpID0+XG4gIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGNyZWF0ZVJlYWN0aW9uS2V5KGFydGljbGUsIHJlYWN0aW9uKSkgPT09IG51bGw7XG5cbmNvbnN0IGRpc2FsbG93ID0gKGFydGljbGU6IEFydGljbGUsIHJlYWN0aW9uOiBSZWFjdGlvblR5cGUpID0+XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGNyZWF0ZVJlYWN0aW9uS2V5KGFydGljbGUsIHJlYWN0aW9uKSwgJzEnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJ0aWNsZVJlYWN0aW9uc0NvbXBvbmVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICBAcHJvcGVydHkoeyB0eXBlOiBPYmplY3QgfSlcbiAgYXJ0aWNsZTogQXJ0aWNsZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBPYmplY3QgfSlcbiAgYWxsb3dlZDogeyBba2V5IGluIFJlYWN0aW9uVHlwZV06IGJvb2xlYW4gfSA9IHtcbiAgICBoZWFydDogZmFsc2UsXG4gICAgdW5pY29ybjogZmFsc2UsXG4gICAgbWFyazogZmFsc2UsXG4gIH07XG5cbiAgZmlyc3RVcGRhdGVkKCkge1xuICAgIHRoaXMuYWxsb3dlZCA9IHtcbiAgICAgIGhlYXJ0OiBpc0FsbG93ZWQodGhpcy5hcnRpY2xlLCAnaGVhcnQnKSxcbiAgICAgIHVuaWNvcm46IGlzQWxsb3dlZCh0aGlzLmFydGljbGUsICd1bmljb3JuJyksXG4gICAgICBtYXJrOiBpc0FsbG93ZWQodGhpcy5hcnRpY2xlLCAnbWFyaycpLFxuICAgIH07XG4gIH1cblxuICBhc3luYyBhZGRSZWFjdGlvbihyZWFjdGlvbjogUmVhY3Rpb25UeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFpc0FsbG93ZWQodGhpcy5hcnRpY2xlLCByZWFjdGlvbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgYXBpQ2xpZW50LnBvc3Q8UmVhY3Rpb25UeXBlPihgL2FwaS92MS9hcnRpY2xlLyR7dGhpcy5hcnRpY2xlLl9pZH0vcmVhY3Rpb25gLCB7XG4gICAgICAgIHJlYWN0aW9uLFxuICAgICAgfSk7XG4gICAgICBkaXNhbGxvdyh0aGlzLmFydGljbGUsIHJlYWN0aW9uKTtcbiAgICAgIHRoaXMuYWxsb3dlZCA9IHsgLi4udGhpcy5hbGxvd2VkLCBbcmVhY3Rpb25dOiBmYWxzZSB9O1xuICAgICAgdGhpcy5hcnRpY2xlLnJlYWN0aW9ucy50eXBlc1tyZWFjdGlvbl0uY291bnQgPSArK3RoaXMuYXJ0aWNsZS5yZWFjdGlvbnMudHlwZXNbcmVhY3Rpb25dLmNvdW50O1xuICAgICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGVycm9ySGFuZGxlclNlcnZpY2UudGhyb3coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3R5bGVzKCkge1xuICAgIHJldHVybiBjc3NgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuXG4gICAgICAucmVhY3Rpb25zIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgICAgIHBhZGRpbmc6IDE4cHggMDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogM3JlbTtcbiAgICAgIH1cblxuICAgICAgLnJlYWN0aW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLnJlYWN0aW9uIGltZyB7XG4gICAgICAgIHdpZHRoOiAyOHB4O1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgfVxuXG4gICAgICAuY291bnQge1xuICAgICAgICBtYXJnaW4tbGVmdDogOHB4O1xuICAgICAgfVxuXG4gICAgICAuYnV0dG9uIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICAgICAgcGFkZGluZzogMTJweDtcbiAgICAgICAgd2lkdGg6IDg0cHg7XG4gICAgICAgIGhlaWdodDogNTRweDtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgICAgICBjb2xvcjogIzIyMjtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBodG1sYFxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJyZWFjdGlvbnNcIj5cbiAgICAgICAgJHtPYmplY3QuZW50cmllcyh0aGlzLmFydGljbGUhLnJlYWN0aW9ucy50eXBlcykubWFwKFxuICAgICAgICAgIChbdHlwZSwgcmVhY3Rpb25dKSA9PiBodG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlYWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAuZGlzYWJsZWQ9XCIkeyF0aGlzLmFsbG93ZWRbPFJlYWN0aW9uVHlwZT50eXBlXX1cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uICR7IXRoaXMuYWxsb3dlZFs8UmVhY3Rpb25UeXBlPnR5cGVdXG4gICAgICAgICAgICAgICAgICA/ICdpcy1wcmltYXJ5J1xuICAgICAgICAgICAgICAgICAgOiBub3RoaW5nfSBpcy1yb3VuZGVkXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uIGlzLWxhcmdlXCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCIkeygpID0+IHRoaXMuYWRkUmVhY3Rpb24odHlwZSBhcyBSZWFjdGlvblR5cGUpfVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1hZ2VzLyR7dHlwZX0ucG5nXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvdW50XCI+JHtyZWFjdGlvbi5jb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgYFxuICAgICAgICApfVxuICAgICAgPC9zZWN0aW9uPlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdlei1hcnRpY2xlLXJlYWN0aW9ucycsIEFydGljbGVSZWFjdGlvbnNDb21wb25lbnQpO1xuIiwiaW1wb3J0IHsgaHRtbCwgTGl0RWxlbWVudCwgY3NzIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuXG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICcuLi8uLi9jb3JlL2RpcmVjdGl2ZXMvdHJhbnNsYXRlLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFydGljbGVBdXRob3JDb21wb25lbnQgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgc3RhdGljIGdldCBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIGNzc2BcbiAgICAgIC5wcmVzZW50YXRpb24ge1xuICAgICAgICBmb250LWZhbWlseTogJ0lCTSBQbGV4IFNhbnMnLCBzYW5zLXNlcmlmO1xuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZVwiPlxuICAgICAgICA8ZmlndXJlXG4gICAgICAgICAgY2xhc3M9XCJhdmF0YXJcIlxuICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9wb3J0cmFpdC5qcGcnKVwiXG4gICAgICAgID48L2ZpZ3VyZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInByZXNlbnRhdGlvblwiPlxuICAgICAgICAgIDxzdHJvbmc+RWRvdWFyZCBCb3pvbjwvc3Ryb25nPjxiciAvPlxuICAgICAgICAgIDxzcGFuPiR7dHJhbnNsYXRlKCdwcm9maWxlLmRlc2NyaXB0aW9uJyl9PC9zcGFuPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb2xsb3ctbWVcIj5cbiAgICAgICAgICAgIDxpZnJhbWVcbiAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9wbGF0Zm9ybS50d2l0dGVyLmNvbS93aWRnZXRzL2ZvbGxvd19idXR0b24uaHRtbD9zY3JlZW5fbmFtZT1lZG91YXJkYm96b24mc2hvd19zY3JlZW5fbmFtZT10cnVlJnNob3dfY291bnQ9ZmFsc2VcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkZvbGxvdyBtZVwiXG4gICAgICAgICAgICAgIHdpZHRoPVwiMTQ4XCJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiMjZcIlxuICAgICAgICAgICAgICBzdHlsZT1cIm1hcmdpbi10b3A6IDEycHg7IGJvcmRlcjogMDsgb3ZlcmZsb3c6IGhpZGRlbjtcIlxuICAgICAgICAgICAgPjwvaWZyYW1lPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdlei1hcnRpY2xlLWF1dGhvcicsIEFydGljbGVBdXRob3JDb21wb25lbnQpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==