- width: default auto 
- box-sizing: cach tinh with tu dau, content, border ....
- gap attribute
- flex -> flex-wrap
- :first-child
- :last-child

1. lap lai viec tao state
    -> tao 1 object {
        email : '',
        password: '',
        name: '',
 
    }
    -> tach state = {
        email: "error"
    }
2. Validate() field duoc dat o nhieu cho
3. Context for form
   {
     initValue: formValue,
     error: error
   }


Object.values

const body = {
    email: state['email'].value,
    password: state['password'].value
}

axios.post('/api', {
    body: {
        email: "",
        password: ""
    },
    method: ""
})

<input name="email">
<input name="password">
------------------------------------------------------------------------
1. validate từng field
2. Làm nhập lại password
