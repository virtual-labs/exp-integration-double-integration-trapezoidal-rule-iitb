function activity1_p1() {
    let btn = (document.getElementById('act1-btn-2'));
    btn && btn.remove();
    let btn_txt = get_collapse_btn_text('Step 2', 'act1-p1-div');
    maindiv.innerHTML += `
   ${btn_txt}
   <div id="act1-p1-div" class="divide collapse center-text">
      <p class="fs-18px fb-500" style="text-align:left;">Calculate S</p>
      <div class="fs-18px fb-500">
         S<sub>j</sub> for column 1 = <span style="display:inline-block;">
            $$ \\frac{h_y}{2}(Z_{11} + 2Z_{21} + 2Z_{31} + ... + 2Z_{n1} + Z_{n+1,1}) $$
         </span> <br>where j&rarr;0 to n+1
      </div>
      <br>
      <div id="tb-box2">
         <div class='table-responsive'>
            <table class='table table-stripped'>
               <thead id='s-table-head' class='table-dark' ></thead>
               <tbody id='s-table-body'></tbody>
            </table>
         </div>
         <br>
         <button class='btn btn-info std-btn' onclick='verify_s();' style='position: relative; left: 0w;' id='act1-p1-btn-1'>Verify</button>
         <button class='btn btn-info std-btn' onclick='load_I_div();' style='display:none; position: relative; left: 0w;' id='act1-p1-btn-2'>Next</button>
      </div>
   </div>
   `;
    setTimeout(() => MathJax.typeset(), 50);
    hide_all_steps();
    setTimeout(() => {
        show_step('act1-p1-div');
    }, 150);
    internal_calculations_2();
}
function verify_s() {
    console.log(s);
    for (let i = 0; i < s.length; i++) {
        let s_inp = (document.getElementById(`s-inp-${i}`));
        if (!verify_values(parseFloat(s_inp.value), parseFloat(s[i].toFixed(3)))) {
            s_inp.style.border = '1px solid red';
            alert('Incorrect value');
            return;
        }
        else {
            s_inp.style.border = '1px solid #ced4da';
            s_inp.disabled = true;
        }
    }
    alert('Great!! Your calculation is correct.');
    let last_row = (document.getElementById('s-table-last-row'));
    let btn = (document.getElementById('act1-p1-btn-1'));
    let next_btn = (document.getElementById('act1-p1-btn-2'));
    btn && btn.remove();
    last_row.innerHTML = '';
    let ele = `<td>S<sub>j</sub></td>`;
    for (let i = 0; i < s.length; i++) {
        ele += `<td>${parseFloat(s[i].toFixed(3))}</td>`;
    }
    last_row.innerHTML = ele;
    next_btn.style.display = 'inline-block';
}
function load_table2() {
    let head = (document.getElementById('s-table-head'));
    let body = (document.getElementById('s-table-body'));
    let header_ele = `<tr>`;
    for (let i = 0; i < header.length; i++) {
        header_ele += `
         <th>${header[i]}</th>
      `;
    }
    header_ele += `</tr>`;
    head.innerHTML = header_ele;
    let body_ele = '';
    for (let i = 0; i < table_data1.length; i++) {
        body_ele += `<tr>`;
        for (let j = 0; j < table_data1[i].length; j++) {
            body_ele += `<td>${parseFloat(table_data1[i][j].toFixed(3))}</td>`;
        }
        body_ele += `</tr>`;
    }
    body_ele += `<tr id="s-table-last-row">
         <td>S<sub>j</sub></td>
      `;
    for (let i = 0; i < s.length; i++) {
        body_ele += `
            <td>
               <input class='form-control' id="s-inp-${i}" />
            </td>
         `;
    }
    body_ele += `</tr>`;
    body.innerHTML = body_ele;
}
function internal_calculations_2() {
    s = [];
    for (let j = 0; j <= n; j++) {
        s[j] = 0;
        for (let i = 0; i < m; i++) {
            s[j] += z[i][j] + z[i + 1][j];
        }
        s[j] = (hy / 2) * s[j];
    }
    // let ar: any[] = ['S<sub>j</sub>', ...s];
    // table_data1.push(ar);
    load_table2();
}
function load_I_div() {
    let div = (document.getElementById('act1-p1-div'));
    let btn = (document.getElementById('act1-p1-btn-2'));
    btn && btn.remove();
    I = 0;
    for (let j = 0; j < n; j++) {
        I += s[j] + s[j + 1];
    }
    I = (hx / 2) * I;
    div.innerHTML += `
      <br>
      <p class="fs-18px fb-500" style="text-align:left;">Calculate I</p>

      <div id="I-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-7">
               $$ I = \\frac{h_x}{2}(S_1 + 2S_2 + 2S_3 + ... + 2S_n + S_{n+1}) = $$
            </div>
            <div class="col-md-4">
               <input type='number' id='I-inp' class='form-control fs-16px' />
            </div>
         </div>
         <br>
         <button class='btn btn-info std-btn' onclick='verify_I();' style='position: relative; left: 0w;' id='vf-I-btn'>Verify</button>
      </div>
   `;
    setTimeout(() => MathJax.typeset(), 50);
}
function verify_I() {
    console.log(I);
    let I_inp = (document.getElementById('I-inp'));
    if (!verify_values(parseFloat(I_inp.value), parseFloat(I.toFixed(3)))) {
        I_inp.style.border = '1px solid red';
        alert('Incorrect I value');
        return;
    }
    else {
        I_inp.style.border = '1px solid #ced4da';
        I_inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = document.getElementById('I-div');
    div.innerHTML = '';
    div.innerHTML = `
   <div>
   $$ I = \\frac{h_x}{2}(S_1 + 2S_2 + 2S_3 + ... + 2S_n + S_{n+1}) = ${parseFloat(I.toFixed(3))} $$
   </div>
   <br>
   <button class='btn btn-info std-btn' onclick='exp_complete();' style='position: relative; left: 0w;' id='act1-p1-btn-3'>Next</button>
   `;
    setTimeout(() => MathJax.typeset(), 50);
}
function exp_complete() {
    let btn = (document.getElementById('act1-p1-btn-3'));
    btn && btn.remove();
    alert('Experiment Complete');
}
// activity1_p1();
//# sourceMappingURL=activity1_p1.js.map