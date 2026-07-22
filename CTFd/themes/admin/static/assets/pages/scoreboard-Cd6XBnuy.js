import{i as e}from"../rolldown-runtime-aKtaBQYM.js";import{I as t,P as n,W as r}from"./main-DNAMzgwK.js";var i=e(r()),a={users:(e,t)=>n.api.patch_user_public({userId:e},t),teams:(e,t)=>n.api.patch_team_public({teamId:e},t)};function o(){let e=(0,i.default)(this),t=e.data(`account-id`),r=e.data(`state`),o;r===`visible`?o=!0:r===`hidden`&&(o=!1);let s={hidden:o};a[n.config.userMode](t,s).then(t=>{t.success&&(o?(e.data(`state`,`hidden`),e.addClass(`btn-danger`).removeClass(`btn-success`),e.text(`Hidden`)):(e.data(`state`,`visible`),e.addClass(`btn-success`).removeClass(`btn-danger`),e.text(`Visible`)))})}function s(e,t){let r={hidden:t===`hidden`},i=[];for(let t of e.accounts)i.push(a[n.config.userMode](t,r));for(let t of e.users)i.push(a.users(t,r));Promise.all(i).then(e=>{window.location.reload()})}function c(e){let n={accounts:(0,i.default)(`.tab-pane.active input[data-account-id]:checked`).map(function(){return(0,i.default)(this).data(`account-id`)}),users:(0,i.default)(`.tab-pane.active input[data-user-id]:checked`).map(function(){return(0,i.default)(this).data(`user-id`)})};t({title:`Toggle Visibility`,body:(0,i.default)(`
    <form id="scoreboard-bulk-edit">
      <div class="form-group">
        <label>Visibility</label>
        <select name="visibility" data-initial="">
          <option value="">--</option>
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>
    </form>
    `),button:`Submit`,success:function(){let e=(0,i.default)(`#scoreboard-bulk-edit`).serializeJSON(!0).visibility;s(n,e)}})}(0,i.default)(()=>{(0,i.default)(`.scoreboard-toggle`).click(o),(0,i.default)(`#scoreboard-edit-button`).click(c)});