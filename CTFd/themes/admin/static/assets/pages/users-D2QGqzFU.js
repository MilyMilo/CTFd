import{i as e}from"../rolldown-runtime-aKtaBQYM.js";import{I as t,P as n,W as r,z as i}from"./main-DNAMzgwK.js";var a=e(r());function o(e){let t=(0,a.default)(`input[data-user-id]:checked`).map(function(){return(0,a.default)(this).data(`user-id`)}),r=t.length===1?`user`:`users`;i({title:`Delete Users`,body:`Are you sure you want to delete ${t.length} ${r}?`,success:function(){let e=[];for(var r of t)e.push(n.fetch(`/api/v1/users/${r}`,{method:`DELETE`}));Promise.all(e).then(e=>{window.location.reload()})}})}function s(e){let r=(0,a.default)(`input[data-user-id]:checked`).map(function(){return(0,a.default)(this).data(`user-id`)});t({title:`Edit Users`,body:(0,a.default)(`
    <form id="users-bulk-edit">
      <div class="form-group">
        <label>Verified</label>
        <select name="verified" data-initial="">
          <option value="">--</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <div class="form-group">
        <label>Banned</label>
        <select name="banned" data-initial="">
          <option value="">--</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <div class="form-group">
        <label>Hidden</label>
        <select name="hidden" data-initial="">
          <option value="">--</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
    </form>
    `),button:`Submit`,success:function(){let e=(0,a.default)(`#users-bulk-edit`).serializeJSON(!0),t=[];for(var i of r)t.push(n.fetch(`/api/v1/users/${i}`,{method:`PATCH`,body:JSON.stringify(e)}));Promise.all(t).then(e=>{window.location.reload()})}})}(0,a.default)(()=>{(0,a.default)(`#users-delete-button`).click(o),(0,a.default)(`#users-edit-button`).click(s)});