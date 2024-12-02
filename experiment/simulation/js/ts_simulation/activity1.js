let maindiv = (document.getElementById('pannelcreate'));
function activity1() {
    let text = `

   <div class='divide'>
   <div style='margin-top: 2vw;'>
   <h4 class="center-text fs-28px fb-700">Integration: Double Integration Trapezoidal Rule</h4>
   <br><br>
   
   <h4 class="fb-700 fs-28px" style="text-align:center">Activity 1</h4>
      <br><br>

      <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
   </div>
   </div>
   `;
    maindiv.innerHTML = text;
}
//for starting first activity
function start_act1() {
    let temp_btn = (document.getElementById('temp-btn-1'));
    temp_btn && temp_btn.remove();
    let btn_text = get_collapse_btn_text('Step 1', 'act1-div');
    let text = `
      ${btn_text}
      <div class='collapse center-text divide' style='style='margin-top: 2vw; width: 80%; margin: auto;' id='act1-div'>
         <div>
            $$ \\int_${y1}^${y2}{\\int_${x1}^${x2}{e^{(x+y)} dxdy}} $$
         </div>
         <br>
         <div class="row justify-content-center fs-18px fb-500">
            <div class="col-md-3">
               x<sub>1</sub> = ${x1}
            </div>
            <div class="col-md-3">
               x<sub>2</sub> = ${x2}
            </div>
            <div class="col-md-3">
               y<sub>1</sub> = ${y1}
            </div>
            <div class="col-md-3">
               y<sub>2</sub> = ${y2}
            </div>
         </div>
         <br>
         <br>
         <div class="center-text fs-18px fb-500">
            'n' is number of division in x direction
            <br>
            'm' is number of division in y direction
         </div>
         <br>
         <div id="n-m-div">
            <div class="row justify-content-center fs-18px" style="align-items:center;">
               <div class="col-md-4">
                  Choose 'n'
               </div>
               <div class="col-md-4">
                  <select class='form-select fs-16px' id='act1-n-inp' >
                     <option value="0">Select n</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                     <option value="6">6</option>
                  </select>
               </div>
            </div>
            <br>
            <div class="row justify-content-center fs-18px" style="align-items:center;">
               <div class="col-md-4">
                  Choose 'm'
               </div>
               <div class="col-md-4">
                  <select class='form-select fs-16px' id='act1-m-inp' >
                     <option value="0">Select m</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                     <option value="6">6</option>
                  </select>
               </div>
            </div>
            <br>
            <button class='btn btn-info std-btn' onclick='verify_select();' style='position: relative; left: 0w;' id='vf-select-btn'>Next</button>
         </div>
      </div>
   `;
    maindiv.innerHTML += text;
    setTimeout(() => MathJax.typeset(), 50);
    hide_all_steps();
    setTimeout(() => {
        show_step('act1-div');
    }, 150);
}
function set_n() {
    let sel = (document.getElementById('act1-n-inp'));
    if (sel.value != '0') {
        n = parseInt(sel.value);
        return true;
    }
    n = 0;
    alert("Select 'n'");
    return false;
}
function set_m() {
    let sel = (document.getElementById('act1-m-inp'));
    if (sel.value != '0') {
        m = parseInt(sel.value);
        return true;
    }
    m = 0;
    alert("Select 'm'");
    return false;
}
function verify_select() {
    let div = (document.getElementById('n-m-div'));
    let outer_div = (document.getElementById('act1-div'));
    if (set_n() && set_m()) {
        div.innerHTML = '';
        div.innerHTML = `
         <div class="fs-18px fb-500">
            n = ${n} , m = ${m}
         </div>
      `;
        outer_div.innerHTML += `
      <br>
      <div>
         <p class="fb-500" style="text-align:left">Calculate,</p>
         <div id="hx-hy-div">
            <div class="row justify-content-center" style="align-items:center;">
               <div class="col-sm-5">
                  $$ h_x = \\frac{x_2 - x_1}{n} =  $$
               </div>
               <div class="col-sm-5">
                  <input type='number' id='hx-inp' class='form-control fs-16px' />
               </div>
            </div>
            <div class="row justify-content-center" style="align-items:center;">
               <div class="col-sm-5">
                  $$ h_y = \\frac{y_2 - y_1}{m} =  $$
               </div>
               <div class="col-sm-5">
                  <input type='number' id='hy-inp' class='form-control fs-16px' />
               </div>
            </div>
            <br>
            <button class='btn btn-info std-btn' onclick='verify_hx_hy();' style='position: relative; left: 0w;' id='vf-hx-hy-btn'>Verify</button>
         </div>
      </div>
      `;
        setTimeout(() => MathJax.typeset(), 50);
        internal_calculations_1();
    }
}
function internal_calculations_1() {
    hx = 0;
    hy = 0;
    x = [];
    y = [];
    z = [];
    table_data1 = [];
    hx = (x2 - x1) / n;
    hy = (y2 - y1) / m;
    //generating x data
    for (let i = 0; i <= n; i++) {
        x.push(i * hx);
    }
    //generating y data
    for (let i = 0; i <= m; i++) {
        y.push(1 + i * hy);
    }
    //generating z data
    for (let i = 0; i < y.length; i++) {
        let ar = [];
        for (let j = 0; j < x.length; j++) {
            ar.push(f(x[j], y[i]));
        }
        z.push(ar);
    }
    //creating data to display
    for (let i = 0; i < y.length; i++) {
        let ar = [y[i], ...z[i]];
        table_data1.push(ar);
    }
    console.log('hx = ', hx);
    console.log('hy = ', hy);
    console.log('table_data1 = ', table_data1);
}
function f(x, y) {
    return Math.exp(x + y);
}
function verify_hx_hy() {
    let hx_inp = (document.getElementById('hx-inp'));
    let hy_inp = (document.getElementById('hy-inp'));
    console.log(hx, hy);
    if (!verify_values(parseFloat(hx_inp.value), parseFloat(hx.toFixed(3)))) {
        hx_inp.style.border = '1px solid red';
        alert('Incorrect hx value');
        return;
    }
    else {
        hx_inp.style.border = '1px solid #ced4da';
        hx_inp.disabled = true;
    }
    if (!verify_values(parseFloat(hy_inp.value), parseFloat(hy.toFixed(3)))) {
        hy_inp.style.border = '1px solid red';
        alert('Incorrect hy value');
        return;
    }
    else {
        hy_inp.style.border = '1px solid #ced4da';
        hy_inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('hx-hy-div'));
    div.innerHTML = '';
    div.innerHTML = `
   <div class="row justify-content-center" style="align-items:center;">
      <div class="col-sm-5">
         $$ h_x = \\frac{x_2 - x_1}{n} = ${parseFloat(hx.toFixed(3))} $$
      </div>
      <div class="col-sm-5">
         $$ h_y = \\frac{y_2 - y_1}{m} = ${parseFloat(hy.toFixed(3))} $$
      </div>
   </div>
   <br>
   <button class='btn btn-info std-btn' onclick='load_table();' style='position: relative; left: 0w;' id='act1-btn-1'>Next</button>
   `;
    setTimeout(() => MathJax.typeset(), 50);
}
function load_table() {
    let btn = (document.getElementById('act1-btn-1'));
    btn && btn.remove();
    let div = (document.getElementById('act1-div'));
    div.innerHTML += `
   <br>
   <div class="center-text">
      <div>
         $$ f(x,y) = e^{(x+y)} $$
      </div>
      <div id="tb-box1"></div>
      <br>
      <button class='btn btn-info std-btn' onclick='activity1_p1();' style='display:none; position: relative; left: 0w;' id='act1-btn-2'>Next</button>
   </div>
   `;
    setTimeout(() => MathJax.typeset(), 50);
    let tb_box = (document.getElementById('tb-box1'));
    header = [];
    header = ['y&darr; \\ x&rarr;'];
    let vf_row = [];
    let vf_col = [];
    for (let i = 0; i <= m; i++) {
        vf_row.push(i);
        let ar = [];
        for (let i = 0; i <= n; i++) {
            ar.push(i + 1);
        }
        vf_col.push(ar);
    }
    for (let i = 0; i <= n; i++) {
        header.push(parseFloat((hx * i).toFixed(3)).toString());
    }
    let tab = new Verify_Rows_Cols(header, table_data1, vf_row, vf_col, '', tb_box, true, true, after_verify);
    tab.load_table();
}
function after_verify() {
    let btn = (document.getElementById('act1-btn-2'));
    btn.style.display = 'inline-block';
}
activity1();
//# sourceMappingURL=activity1.js.map