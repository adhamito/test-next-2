


export function getDesserts() {
    try {
        const storedDesserts = localStorage.getItem('cartItems'); 
        if (storedDesserts) {
            return JSON.parse(storedDesserts); 
        }
        return []; 
    } catch (error) {
        console.error('Failed to retrieve cartItems from localStorage:', error);
        return []; 
    }
}

export function AddToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cart));
  
    
   
  }
  

export function RemoveFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  cart = cart.filter(cartItem => cartItem.id !== itemId);
  localStorage.setItem('cartItems', JSON.stringify(cart));
}

export function AddQuantity(itemId) {
  let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const item = cart.find(cartItem => cartItem.id === itemId);
  
  if (item) {
    item.quantity += 1;
  }
  
  localStorage.setItem('cartItems', JSON.stringify(cart));
}

export function RemoveQuantity(itemId) {
  let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const item = cart.find(cartItem => cartItem.id === itemId);
  
  if (item) {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart = cart.filter(cartItem => cartItem.id !== itemId);
    }
  }
  
  localStorage.setItem('cartItems', JSON.stringify(cart));
}

export function Total() {
  let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return total.toFixed(2);
}
