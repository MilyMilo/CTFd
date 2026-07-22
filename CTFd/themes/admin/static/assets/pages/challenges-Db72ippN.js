import{i as e}from"../rolldown-runtime-aKtaBQYM.js";import{I as t,P as n,W as r,z as i}from"./main-Bdz0jqQ7.js";var a=e(r());function o(e){let t=(0,a.default)(`input[data-challenge-id]:checked`).map(function(){return(0,a.default)(this).data(`challenge-id`)}),r=t.length===1?`challenge`:`challenges`;i({title:`Delete Challenges`,body:`Are you sure you want to delete ${t.length} ${r}?`,success:function(){let e=[];for(var r of t)e.push(n.fetch(`/api/v1/challenges/${r}`,{method:`DELETE`}));Promise.all(e).then(e=>{window.location.reload()})}})}function s(e){let r=(0,a.default)(`input[data-challenge-id]:checked`).map(function(){return(0,a.default)(this).data(`challenge-id`)}),i=(0,a.default)(`input[data-challenge-id]:checked`).map(function(){return(0,a.default)(this).data(`solution-id`)});t({title:`Edit Challenges`,body:(0,a.default)(`
    <form id="challenges-bulk-edit">
      <div class="form-group">
        <label>Category</label>
        <input type="text" name="category" data-initial="" value="">
      </div>
      <div class="form-group">
        <label>Value</label>
        <input type="number" name="value" data-initial="" value="">
      </div>
      <div class="form-group">
        <label>State</label>
        <select name="state" data-initial="">
          <option value="">--</option>
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>
      <div class="form-group">
        <label>Solution</label>
        <select name="solution" data-initial="">
          <option value="">--</option>
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
          <option value="solved">Solved</option>
        </select>
      </div>
    </form>
    `),button:`Submit`,success:function(){let e=[],t=(0,a.default)(`#challenges-bulk-edit`).serializeJSON(!0),o={state:t.solution};if(delete t.solution,Object.keys(t).length!==0)for(var s of r)e.push(n.fetch(`/api/v1/challenges/${s}`,{method:`PATCH`,body:JSON.stringify(t)}));if(o.state)for(var c of i)c&&e.push(n.fetch(`/api/v1/solutions/${c}`,{method:`PATCH`,body:JSON.stringify(o)}));Promise.all(e).then(e=>{window.location.reload()})}})}(0,a.default)(()=>{(0,a.default)(`#challenges-delete-button`).click(o),(0,a.default)(`#challenges-edit-button`).click(s)});