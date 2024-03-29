import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// ??

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting =navigation.state==='submitting'
  const formErrors = useActionData();

  return (
    <div className="mx-1 px-4 py-6" >
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let us go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center" >
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          {formErrors?.phone&&<p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-full">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center" >
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full"  type="text" name="address" required />
          </div>
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow  focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium" >Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          {/* <button disabled={isSubmitting} className="inline-block px-4 py-3  bg-yellow-500 
          font-semibold rounded-full  text-stone-800  tracking-wide hover:bg-yellow-300   focus:outline-none focus:ring  focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 
         uppercase transition-colors duration-300 disabled:cursor-not-allowed mb-2">{isSubmitting ? 'Placing order...' : 'Order now'}</button> */}
          <Button type="primary" disabled={isSubmitting}>{isSubmitting ? 'Placing order...' : 'Order now'}</Button>
        </div>
      </Form>
    </div>
  );
}

//当提交表单的时候会触发action函数
export async function action({request}) {
  const formData = await request.formData();
  const data =Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority:data.priority==='on'
  }

  const errors = {};
  if(!isValidPhone(order.data)) errors.phone='Please enter a valid phone number.We might need it to contact you.'
  if (Object.keys(errors).length > 0) return errors;
  
  // If finished, create a new order.
  const newOrder =await createOrder(order);
  
  return redirect(`/order/${newOrder.id}`);
}


export default CreateOrder;
