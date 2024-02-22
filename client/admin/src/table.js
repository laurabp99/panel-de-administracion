class Table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.rows = null
  }

  connectedCallback () {
    this.loadData().then(() => this.render())

    document.addEventListener('showFilterModal', event => {
      this.openModal()
    })

    document.addEventListener('refresh', event => {
      this.loadData().then(() => this.render())
    })
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}`)
    const data = await response.json()
    this.rows = data.rows
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
            <style>
            main{
                display:flex;
                gap: 3rem;
            }

            ul {
                list-style: none;
                margin-left: 10px;
            }

            li span:after{
                content: ":";
                margin-right: 0.5rem;
            }
                
            .filter-bar {
                background-color: white;
                max-height: 3rem;
                border: 0.2rem solid hsl(214, 86%, 73%);
                box-shadow: 7px 8px 5px black;
            }


            .filter-button {
                display: flex;
                justify-content: center;
                padding: 5px;
            }

            .filter-button svg {
                width: 2rem;  
                fill: hsl(214, 86%, 73%);
                cursor: pointer;
            }

            .filter-table{
                display: flex;
                gap: 3rem;
                flex-direction: column;
            }

            .filter-table p{
                color: #fff;
            }

            .table {
                display: flex;
                flex-direction: column;
                gap: 3rem;
            }

            .registers {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                background-color: hsl(240, 74%, 56%);
                justify-content: space-between;
                font-size: 20px;
                font-family: Arial, Helvetica, sans-serif;
                color: white;
            }

            .registers svg{
                fill:white
            }

            .register{
                gap: 3rem;
                border: 0.2rem solid hsl(214, 86%, 73%);
                box-shadow: 7px 8px 5px black;
            }

            .register-data{
                background-color:hsl(240, 79%, 68%);
                padding: 0.5rem

            }

            .modify-register{
                display: flex;
                background-color: hsl(194, 100%, 50%);
                justify-content: flex-end;
            }

            .edit-button{
                width: 30px;
                cursor: pointer;
            }

            .delete{
                width: 30px;
                cursor: pointer;
            }

            .delete-button {
                display: flex;
                justify-content: center;
                width: 30px;
                cursor: pointer;
            }
            </style>
            <div class="table">
              <div class="filter-bar">
                <div class="filter-button">
                  <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                    <title>Filter Menu</title>
                  <path
                      d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z" />
                  </svg>
                </div>
              </div>
              <div class="registers"></div>
            </div>
        `

    const registers = this.shadow.querySelector('.registers')

    this.rows.forEach(row => {
      // <div class="register">
      //   <div class="modify-register">
      //     <div class="edit-button">
      //       <svg xmlns="http://www.w3.org/2000/svg"
      //           viewBox="0 0 24 24">
      //         <title>pencil</title>
      //         <path
      //           d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
      //       </svg>
      //     </div>
      //     <div class="delete-button">
      //       <svg xmlns="http://www.w3.org/2000/svg"
      //         viewBox="0 0 24 24">
      //       <title>delete</title>
      //       <path
      //         d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
      //       </svg>
      //     </div>
      //   </div>
      //   <div class="register-data">
      //     <ul>
      //       <li>Email</li>
      //       <li>Nombre</li>
      //       <li>Apellidos</li>
      //     </ul>
      //   </div>
      // </div>
      const newRegister = document.createElement('div')
      newRegister.classList.add('register')
      registers.appendChild(newRegister)

      const modifyRegister = document.createElement('div')
      modifyRegister.classList.add('modify-register')

      const editButton = document.createElement('div')
      editButton.classList.add('edit-button')
      editButton.dataset.id = row.id
      editButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>pencil</title>
              <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
          </svg>
      `
      const deleteButton = document.createElement('div')
      deleteButton.classList.add('delete-button')
      deleteButton.dataset.id = row.id
      deleteButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>delete</title>
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
      `

      modifyRegister.appendChild(editButton)
      modifyRegister.appendChild(deleteButton)
      newRegister.appendChild(modifyRegister)

      const registerData = document.createElement('div')
      registerData.classList.add('register-data')
      const list = document.createElement('ul')
      list.innerHTML = `
          <li><span>Nombre</span>${row.name}</li>
          <li><span>CreatedAt</span>${row.createdAt}</li>
          <li><span>UpdatedAt</span>${row.updatedAt}</li>
      `
      registerData.appendChild(list)
      newRegister.appendChild(registerData)
    })

    const tableSection = this.shadow.querySelector('.table')

    tableSection?.addEventListener('click', async (event) => {
      if (event.target.closest('.filter-button')) {
        document.dispatchEvent(new CustomEvent('showFilterModal'))
      }

      if (event.target.closest('.edit-button')) {
        const editButton = event.target.closest('.edit-button')
        const id = editButton.dataset.id

        const response = await fetch(`${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${id}`)
        const data = await response.json()

        document.dispatchEvent(new CustomEvent('showElement', {
          detail: {
            data
          }
        }))
      }

      if (event.target.closest('.delete-button')) {
        const deleteButton = event.target.closest('.delete-button')
        const id = deleteButton.dataset.id
        const endPoint = `${import.meta.env.VITE_API_URL}${this.getAttribute('endpoint')}/${id}`
        document.dispatchEvent(new CustomEvent('showModalDestroy', {
          detail: {
            elementUrl: endPoint
          }
        }))
      }
    })
  }
}

customElements.define('table-component', Table)
