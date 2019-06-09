(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{ACoY:function(e,t,a){"use strict";a.d(t,"a",function(){return s});const s=a("CQbg").b`
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
`},KNVF:function(e,t,a){"use strict";a.r(t);var s=a("CQbg"),i=a("CKJH"),l=a("uTus"),n=a("azgF"),o=a("QQaa"),r=a("ACoY"),u=a("gvQ4");customElements.define("ez-login",class extends s.a{constructor(){super(...arguments),this.showSignup=!1}logUser(e){return i.a.post("/api/v1/auth/login",e)}getMe(){return i.a.get("/api/v1/user/me")}signupUser(e){return i.a.post("/api/v1/auth/signup",e)}static get styles(){return[r.a,o.a,s.b`
        .second {
          margin-top: 50px;
        }

        .section {
          max-width: 350px;
          margin: 0 auto;
        }
      `]}render(){return s.c`
      <ez-page>
        <section class="section">
          ${this.showSignup?s.c`
                <h1 class="title">Signup</h1>
                <form
                  class="box"
                  name="signup"
                  @submit="${async e=>{e.preventDefault();const t=this.shadowRoot,a=t.getElementById("email"),s=t.getElementById("password"),i=t.getElementById("firstName"),o=t.getElementById("lastName"),r={email:a.value,password:s.value,firstName:i.value,lastName:o.value};try{const{token:t}=await this.signupUser(r);l.a.login(t);const a=await this.getMe();l.a.setUser(a),Object(u.a)("/admin")()}catch(e){n.a.throw(e)}}}"
                >
                  <div class="field">
                    <label class="label" for="email">Email</label>
                    <input class="input" id="email" name="email" type="email" required />
                  </div>
                  <div class="field">
                    <label class="label" for="firstName">First name</label>
                    <input class="input" id="firstName" name="firstName" type="string" required />
                  </div>
                  <div class="field">
                    <label class="label" for="lastName">Last name</label>
                    <input class="input" id="lastName" name="lastName" type="string" required />
                  </div>
                  <div class="field">
                    <label class="label" for="password">Password</label>
                    <input class="input" id="password" name="password" type="password" required />
                  </div>
                  <button class="button is-primary" type="submit">
                    Create account
                  </button>
                  <button
                    class="button second"
                    type="button"
                    @click="${()=>{this.showSignup=!this.showSignup,this.requestUpdate()}}"
                  >
                    I already have an account
                  </button>
                </form>
              `:s.c`
                <h1 class="title">Login</h1>
                <form
                  class="box"
                  name="login"
                  @submit="${async e=>{e.preventDefault();const t=this.shadowRoot,a=t.getElementById("email"),s=t.getElementById("password"),i={email:a.value,password:s.value};try{const{token:t}=await this.logUser(i);l.a.login(t);const a=await this.getMe();l.a.setUser(a),Object(u.a)("/admin")()}catch(e){n.a.throw(e)}}}"
                >
                  <div class="field">
                    <label class="label" for="email">Email</label>
                    <input class="input" id="email" name="email" type="email" required />
                  </div>
                  <div class="field">
                    <label class="label" for="password">Password</label>
                    <input class="input" id="password" name="password" type="password" required />
                  </div>
                  <button class="button" type="submit">
                    Login
                  </button>
                  <button
                    class="button second"
                    type="button"
                    @click="${()=>{this.showSignup=!0,this.requestUpdate()}}"
                  >
                    I don't have an account
                  </button>
                </form>
              `}
        </section>
      </ez-page>
    `}})}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3NoYXJlZC9mb3JtLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOlsiX193ZWJwYWNrX3JlcXVpcmVfXyIsImQiLCJfX3dlYnBhY2tfZXhwb3J0c19fIiwiZm9ybVN0eWxlIiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJsaXRfZWxlbWVudCIsIltvYmplY3QgT2JqZWN0XSIsInRoaXMiLCJzaG93U2lnbnVwIiwiY3JlZGVudGlhbHMiLCJhcGlfY2xpZW50IiwicG9zdCIsImdldCIsInVzZXIiLCJzdHlsZXMiLCJzaGFyZWRfZm9ybSIsInNoYXJlZF9idXR0b24iLCJhc3luYyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImhvc3QiLCJzaGFkb3dSb290IiwiZW1haWwiLCJnZXRFbGVtZW50QnlJZCIsInBhc3N3b3JkIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJzaWdudXBQYXlsb2FkIiwidmFsdWUiLCJ0b2tlbiIsInNpZ251cFVzZXIiLCJhdXRoZW50aWNhdGlvbl9zZXJ2aWNlIiwibG9naW4iLCJnZXRNZSIsInNldFVzZXIiLCJPYmplY3QiLCJ1dGlsc19uYXZpZ2F0ZSIsImVycm9yX2hhbmRsZXJfc2VydmljZSIsInRocm93IiwicmVxdWVzdFVwZGF0ZSIsImxvZ1VzZXIiXSwibWFwcGluZ3MiOiIyRkFBQUEsRUFBQUMsRUFBQUMsRUFBQSxzQkFBQUMsSUFFTyxNQUFNQSxFQUZiSCxFQUFBLFFBRXlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvSUN3S3pCSSxlQUFlQyxPQUFPLFdBOUpQLGNBQW9CQyxFQUFBLEVBQW5DQyxrQ0FDRUMsS0FBQUMsWUFBYSxFQUViRixRQUFRRyxHQUNOLE9BQU9DLEVBQUEsRUFBVUMsS0FBd0IscUJBQXNCRixHQUdqRUgsUUFDRSxPQUFPSSxFQUFBLEVBQVVFLElBQVcsbUJBRzlCTixXQUFXTyxHQUNULE9BQU9ILEVBQUEsRUFBVUMsS0FHZCxzQkFBdUJFLEdBRzVCQyxvQkFDRSxNQUFPLENBQ0xDLEVBQUEsRUFDQUMsRUFBQSxFQUNBWCxFQUFBOzs7Ozs7Ozs7U0FhSkMsU0FDRSxPQUFPRCxFQUFBOzs7WUFHQ0UsS0FBS0MsV0FDSEgsRUFBQTs7Ozs7NkJBS2VZLE1BQU9DLElBQ2hCQSxFQUFFQyxpQkFFRixNQUFNQyxFQUFPYixLQUFLYyxXQUNaQyxFQUFRRixFQUFLRyxlQUFlLFNBQzVCQyxFQUFXSixFQUFLRyxlQUFlLFlBQy9CRSxFQUFZTCxFQUFLRyxlQUFlLGFBQ2hDRyxFQUFXTixFQUFLRyxlQUFlLFlBQy9CSSxFQUE2QixDQUNqQ0wsTUFBT0EsRUFBTU0sTUFDYkosU0FBVUEsRUFBU0ksTUFDbkJILFVBQVdBLEVBQVVHLE1BQ3JCRixTQUFVQSxFQUFTRSxPQUdyQixJQUNFLE1BQU1DLE1BQUVBLFNBQWdCdEIsS0FBS3VCLFdBQVdILEdBQ3hDSSxFQUFBLEVBQVlDLE1BQU1ILEdBQ2xCLE1BQU1oQixRQUFhTixLQUFLMEIsUUFDeEJGLEVBQUEsRUFBWUcsUUFBUXJCLEdBQ3BCc0IsT0FBQUMsRUFBQSxFQUFBRCxDQUFTLFNBQVRBLEdBQ0EsTUFBT2pCLEdBQ1BtQixFQUFBLEVBQW9CQyxNQUFNcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkEwQmxCLEtBQ1JYLEtBQUtDLFlBQWNELEtBQUtDLFdBQ3hCRCxLQUFLZ0M7Ozs7O2dCQU9ibEMsRUFBQTs7Ozs7NkJBS2VZLE1BQU9DLElBQ2hCQSxFQUFFQyxpQkFFRixNQUFNQyxFQUFPYixLQUFLYyxXQUNaQyxFQUFRRixFQUFLRyxlQUFlLFNBQzVCQyxFQUFXSixFQUFLRyxlQUFlLFlBQy9CZCxFQUFrQyxDQUN0Q2EsTUFBT0EsRUFBTU0sTUFDYkosU0FBVUEsRUFBU0ksT0FHckIsSUFDRSxNQUFNQyxNQUFFQSxTQUFnQnRCLEtBQUtpQyxRQUFRL0IsR0FDckNzQixFQUFBLEVBQVlDLE1BQU1ILEdBQ2xCLE1BQU1oQixRQUFhTixLQUFLMEIsUUFDeEJGLEVBQUEsRUFBWUcsUUFBUXJCLEdBQ3BCc0IsT0FBQUMsRUFBQSxFQUFBRCxDQUFTLFNBQVRBLEdBQ0EsTUFBT2pCLEdBQ1BtQixFQUFBLEVBQW9CQyxNQUFNcEI7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBa0JsQixLQUNSWCxLQUFLQyxZQUFhLEVBQ2xCRCxLQUFLZ0MiLCJmaWxlIjoiYXBwLWxvZ2luLmZmN2UzYjVmYjE2N2U3ZDA3NzhhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuXG5leHBvcnQgY29uc3QgZm9ybVN0eWxlID0gY3NzYFxuICAuZmllbGQge1xuICAgIG1hcmdpbjogMTBweCAwO1xuICAgIGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggU2FucycsIHNhbnMtc2VyaWY7XG4gIH1cblxuICAuZmllbGQgaW5wdXQsXG4gIC5maWVsZCB0ZXh0YXJlYSxcbiAgLmZpZWxkIHNlbGVjdCB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtYXJnaW4tdG9wOiA2cHg7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBhZGRpbmc6IDZweCA0cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICM2NjY7XG4gIH1cblxuICAuZmllbGQgaW5wdXQsXG4gIC5maWVsZCB0ZXh0YXJlYSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAuZmllbGQgaW5wdXQ6Zm9jdXMsXG4gIC5maWVsZCB0ZXh0YXJlYTpmb2N1cyxcbiAgLmZpZWxkIHNlbGVjdDpmb2N1cyB7XG4gICAgb3V0bGluZTogMXB4IHNvbGlkICM2NjY7XG4gIH1cblxuICAubGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICB9XG5gO1xuIiwiaW1wb3J0IHsgY3NzLCBodG1sLCBMaXRFbGVtZW50IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuXG5pbXBvcnQgeyBDcmVkZW50aWFsc1BheWxvYWQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvc3JjL2FwaS9hdXRoZW50aWNhdGlvbi9lZmZlY3RzL2xvZ2luLmVmZmVjdCc7XG5pbXBvcnQgeyBVc2VyUGF5bG9hZCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NlcnZlci9zcmMvYXBpL2F1dGhlbnRpY2F0aW9uL2VmZmVjdHMvc2lnbnVwLmVmZmVjdCc7XG5pbXBvcnQgeyBhcGlDbGllbnQgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2FwaS1jbGllbnQnO1xuaW1wb3J0IHsgYXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHsgZXJyb3JIYW5kbGVyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvZXJyb3ItaGFuZGxlci1zZXJ2aWNlJztcbmltcG9ydCB7IGJ1dHRvblN0eWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2J1dHRvbic7XG5pbXBvcnQgeyBmb3JtU3R5bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvZm9ybSc7XG5pbXBvcnQgeyBuYXZpZ2F0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL25hdmlnYXRlJztcbmltcG9ydCB7IElVc2VyIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIHNob3dTaWdudXAgPSBmYWxzZTtcblxuICBsb2dVc2VyKGNyZWRlbnRpYWxzOiBDcmVkZW50aWFsc1BheWxvYWQpOiBQcm9taXNlPHsgdG9rZW46IHN0cmluZyB9PiB7XG4gICAgcmV0dXJuIGFwaUNsaWVudC5wb3N0PHsgdG9rZW46IHN0cmluZyB9PignL2FwaS92MS9hdXRoL2xvZ2luJywgY3JlZGVudGlhbHMpO1xuICB9XG5cbiAgZ2V0TWUoKTogUHJvbWlzZTxJVXNlcj4ge1xuICAgIHJldHVybiBhcGlDbGllbnQuZ2V0PElVc2VyPignL2FwaS92MS91c2VyL21lJyk7XG4gIH1cblxuICBzaWdudXBVc2VyKHVzZXI6IFVzZXJQYXlsb2FkKTogUHJvbWlzZTx7IHVzZXI6IElVc2VyOyB0b2tlbjogc3RyaW5nIH0+IHtcbiAgICByZXR1cm4gYXBpQ2xpZW50LnBvc3Q8e1xuICAgICAgdXNlcjogSVVzZXI7XG4gICAgICB0b2tlbjogc3RyaW5nO1xuICAgIH0+KCcvYXBpL3YxL2F1dGgvc2lnbnVwJywgdXNlcik7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0eWxlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgZm9ybVN0eWxlLFxuICAgICAgYnV0dG9uU3R5bGUsXG4gICAgICBjc3NgXG4gICAgICAgIC5zZWNvbmQge1xuICAgICAgICAgIG1hcmdpbi10b3A6IDUwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VjdGlvbiB7XG4gICAgICAgICAgbWF4LXdpZHRoOiAzNTBweDtcbiAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgfVxuICAgICAgYCxcbiAgICBdO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBodG1sYFxuICAgICAgPGV6LXBhZ2U+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwic2VjdGlvblwiPlxuICAgICAgICAgICR7dGhpcy5zaG93U2lnbnVwXG4gICAgICAgICAgICA/IGh0bWxgXG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5TaWdudXA8L2gxPlxuICAgICAgICAgICAgICAgIDxmb3JtXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImJveFwiXG4gICAgICAgICAgICAgICAgICBuYW1lPVwic2lnbnVwXCJcbiAgICAgICAgICAgICAgICAgIEBzdWJtaXQ9XCIke2FzeW5jIChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaG9zdCA9IHRoaXMuc2hhZG93Um9vdCBhcyBTaGFkb3dSb290O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbWFpbCA9IGhvc3QuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBob3N0LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGhvc3QuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0TmFtZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3ROYW1lID0gaG9zdC5nZXRFbGVtZW50QnlJZCgnbGFzdE5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaWdudXBQYXlsb2FkOiBVc2VyUGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdG9rZW4gfSA9IGF3YWl0IHRoaXMuc2lnbnVwVXNlcihzaWdudXBQYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgICBhdXRoU2VydmljZS5sb2dpbih0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuZ2V0TWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICBhdXRoU2VydmljZS5zZXRVc2VyKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKCcvYWRtaW4nKSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3JIYW5kbGVyU2VydmljZS50aHJvdyhlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfX1cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiIGZvcj1cImVtYWlsXCI+RW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dFwiIGlkPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJmaXJzdE5hbWVcIj5GaXJzdCBuYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXRcIiBpZD1cImZpcnN0TmFtZVwiIG5hbWU9XCJmaXJzdE5hbWVcIiB0eXBlPVwic3RyaW5nXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwibGFzdE5hbWVcIj5MYXN0IG5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dFwiIGlkPVwibGFzdE5hbWVcIiBuYW1lPVwibGFzdE5hbWVcIiB0eXBlPVwic3RyaW5nXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgaWQ9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gaXMtcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgQ3JlYXRlIGFjY291bnRcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBzZWNvbmRcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiJHsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2lnbnVwID0gIXRoaXMuc2hvd1NpZ251cDtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBJIGFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIDogaHRtbGBcbiAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJ0aXRsZVwiPkxvZ2luPC9oMT5cbiAgICAgICAgICAgICAgICA8Zm9ybVxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJib3hcIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cImxvZ2luXCJcbiAgICAgICAgICAgICAgICAgIEBzdWJtaXQ9XCIke2FzeW5jIChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaG9zdCA9IHRoaXMuc2hhZG93Um9vdCBhcyBTaGFkb3dSb290O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbWFpbCA9IGhvc3QuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSBob3N0LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFsc1BheWxvYWQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdG9rZW4gfSA9IGF3YWl0IHRoaXMubG9nVXNlcihjcmVkZW50aWFscyk7XG4gICAgICAgICAgICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmdldE1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgYXV0aFNlcnZpY2Uuc2V0VXNlcih1c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZSgnL2FkbWluJykoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlclNlcnZpY2UudGhyb3coZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH19XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIiBmb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXRcIiBpZD1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCIgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0XCIgaWQ9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b25cIiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgICAgICAgIExvZ2luXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gc2Vjb25kXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIiR7KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NpZ251cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH19XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgSSBkb24ndCBoYXZlIGFuIGFjY291bnRcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgYH1cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9lei1wYWdlPlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdlei1sb2dpbicsIExvZ2luKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=