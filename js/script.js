/* start variable area coding */

let budget = document.getElementById("budget");
let budget_btn = document.getElementById("budget-btn");
let t_budget = document.getElementById("total-budget");
let product_btn = document.getElementById("product-btn");
let title = document.getElementById("title");
let cost = document.getElementById("cost");
let expense_list = document.getElementById("expense-list");
let expense = document.getElementById("expense");
let balance = document.getElementById("balance");

/* end variable area coding */

//Store budget in local storage
budget_btn.onclick = function (e) {
  e.preventDefault();
  if (budget.value != "") {
    localStorage.setItem("budget", budget.value);
    location.href = location.href;
  } else {
    alert("Budget is empty");
  }
};

//store product in local storage

product_btn.onclick = function (e) {
  e.preventDefault();
  if (title.value != "" && cost.value != null) {
    let p_title = title.value;
    let p_cost = cost.value;
    let data = {
      p_cost: p_cost,
      p_title: p_title,
    };
    let string = JSON.stringify(data);
    localStorage.setItem("budget_" + title.value, string);
    location.href = location.href;
  } else {
    alert("Field is empty");
  }
};

//retrieve data from local storage

function all_data() {
  let i;
  for (i = 0; i < localStorage.length; i++) {
    let all_keys = localStorage.key(i);
    if (all_keys.match("budget_")) {
      let json_data = localStorage.getItem(all_keys);
      let json_parse = JSON.parse(json_data);
      expense_list.innerHTML +=
        '<div class="row mt-3 mb-3 b-border"><div class="col-md-6 mt-3 d-flex justify-content-between"><h5>' +
        json_parse.p_title +
        "</h5><h5 class='price'>" +
        json_parse.p_cost +
        '</h5></div><div class="col-md-6 mt-3 d-flex justify-content-end"><i class="fa fa-edit edit-btn"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash  delete-btn"></i></div></div>';
    }
  }

  let price_tag = document.getElementsByClassName("price");
  let price = [];

  for (i = 0; i < price_tag.length; i++) {
    price[i] = price_tag[i].innerHTML;
  }

  let price_int = [];
  for (i = 0; i < price.length; i++) {
    price_int.push(parseInt(price[i]));
  }

  let final_price = 0;
  for (i = 0; i < price_int.length; i++) {
    final_price += price_int[i];
  }

  expense.innerHTML = final_price;
  t_budget.innerHTML = localStorage.getItem("budget");

  let t_bgt = t_budget.innerHTML;
  let t_expense = expense.innerHTML;
  balance.innerHTML = t_bgt - t_expense;

  //start delete coding

  let delete_btn = document.getElementsByClassName("delete-btn");

  for (i = 0; i < delete_btn.length; i++) {
    delete_btn[i].onclick = function () {
      let cnf = window.confirm("Do you want to delete it?");
      if (cnf) {
        let del_parent = this.parentElement;
        let div_parent = del_parent.parentElement;
        let h5 = div_parent.firstChild.childNodes[0].innerHTML;
        localStorage.removeItem("budget_" + h5);
        location.href = location.href;
      } else {
        alert("Your data is safe!");
      }
    };
  }

  //start edit

  let edit_btn = document.getElementsByClassName("edit-btn");
  for (i = 0; i < edit_btn.length; i++) {
    edit_btn[i].onclick = function () {
      let cnf = window.confirm("Do you want to update it?");
      if (cnf == true) {
        let edit_parent = this.parentElement;
        let col_parent = edit_parent.parentElement;

        let h5_data = col_parent.firstChild.childNodes[0].innerHTML;
        let h5_price = col_parent.firstChild.childNodes[1].innerHTML;

        title.value = h5_data;
        cost.value = h5_price;
        title.focus();
        product_btn.innerHTML = "Update your Data";
        product_btn.style.background = "red";

        product_btn.onclick = function () {
          localStorage.removeItem("budget_" + h5_data);
          let p_title = title.value;
          let p_cost = cost.value;
          let data = {
            p_cost: p_cost,
            p_title: p_title,
          };
          let string = JSON.stringify(data);
          localStorage.setItem("budget_" + title.value, string);
          location.href = location.href;
        };
      } else {
        alert("Your data is safe");
      }
    };
  }
}

all_data();
