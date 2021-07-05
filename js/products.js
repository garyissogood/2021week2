const app = {
    data: {
      apiUrl: 'https://vue3-course-api.hexschool.io/api',
      apiPath: 'gary-api',
      products: [],
    },
    // 取得產品
    getProducts(page = 1) {
      const url = `${this.data.apiUrl}/${this.data.apiPath}/products?page=${page}`;
      axios.get(url).then((res) => {
        if (res.data.success) {
          this.data.products = res.data.products;
          this.renderProduct(this.data.products);
        } else {
          alert('您尚未登入，請重新登入。');
          window.location = 'login.html';
        }
      })
    },
    // 刪除產品
    deleteProduct(e) { 
        const { id } = e.target.dataset;
        const url = `${this.data.apiUrl}/${this.data.apiPath}/admin/product/${id}`;
        if (window.confirm('確定要刪除此商品嗎？')) {  
            axios.delete(url).then((res) => {
            if (res.data.success) {
                alert(res.data.message)
                this.getProducts();
            }
            });
        }
    },
    // 渲染網頁
    renderProduct(data) {
      const productList = document.querySelector('#productList');
      const productCount = document.querySelector('#productCount');
  
      let str = '';
      data.forEach((item) => {
        str += `
          <tr>
            <td class="d-flex align-items-center">
            <img class="w-25 me-3" src="${item.imageUrl}" alt="${item.title}">
            <div class="d-flex flex-column">
                <h4>${item.title}</h4>
                <span>${item.description}</span>
            </div>
            </td>
            <td width="120" valign="middle">${item.num}</td>
            <td width="120" valign="middle">
              ${item.origin_price}
            </td>
            <td width="120" valign="middle">
              ${item.price}
            </td>
            <td width="100" valign="middle">
            <div class="form-check form-switch">
                <input class="form-check-input checkBox" type="checkbox" id="${item.id}" ${item.is_enabled? 'checked': ''} data-action="status" data-id="${item.id}">
                <label class="form-check-label" for="${item.id}">${item.is_enabled? '啟用' : '未啟用'}</label>
            </div>
            </td>
            <td width="120" valign="middle">
            <a href="#" class="deleteBtn text-gray"><span class="material-icons" data-action="remove" data-id="${item.id}">delete</span></a> 
            </td>
          </tr>`;
      });
      productList.innerHTML = str;
      productCount.textContent = this.data.products.length;
  
      const deleteBtn = document.querySelectorAll('.deleteBtn');
      const checkBox =  document.querySelectorAll('.checkBox');

      // 刪除按鈕
      deleteBtn.forEach((item) => {  
        item.addEventListener('click', this.deleteProduct.bind(this));
      });
      checkBox.forEach(item=>{
        item.addEventListener('click', this.useComponents.bind(this))
      });
    },
    // 改變狀態
    activeProduct(id){
        this.data.products.forEach(item=>{
          if(id == item.id){
            item.is_enabled = !item.is_enabled
          }
        })
        this.renderProduct(this.data.products)
    },
    useComponents(e){
        const action = e.target.dataset.action;
        const {id} = e.target.dataset;
        if (action === 'status') {
            this.activeProduct(id);
        }
    },
    created() { //參考範例
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
      this.getProducts();
    }
  }
  
  app.created();