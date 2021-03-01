import axios from 'axios';

export const setTheme = (payload) => ({
  type: 'SET_THEME',
  payload,
});

export const setCurrency = (payload) => ({
  type: 'SET_CURRENCY',
  payload,
});

export const setLanguage = (payload) => ({
  type: 'SET_LANGUAGE',
  payload,
});

export const setCart = (payload) => ({
  type: 'SET_CART',
  payload,
});

export const setFavorites = (payload) => ({
  type: 'SET_FAVORITES',
  payload,
});

export const registerRequest = (payload) => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const changeTheme = async ({ theme, dispatch }) => {
  try {
    document.cookie = `theme=${theme}`;
    dispatch(setTheme(theme));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const changeCurrency = async ({ currency, dispatch }) => {
  if (!currency) return;
  try {
    document.cookie = `currency=${currency}`;
    dispatch(setCurrency(currency));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const changeLanguage = async ({ language, dispatch }) => {
  if (!language) return;
  try {
    document.cookie = `language=${language}`;
    dispatch(setLanguage(language));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const addToCart = ({ cart, product, recipe, dispatch }) => {
  if (!cart && !product && !recipe) return;
  if (cart?.size >= 99) return;
  try {
    const newCart = { ...cart };
    if (product) {
      const element = newCart?.products?.find((item) => item.product.id === product.id);
      if (element) {
        element.count += 1;
      } else {
        const cartItem = { count: 1, product };
        newCart.products.push(cartItem);
      }
    }
    if (recipe) {
      const element = newCart?.recipes?.find((item) => item.recipe.id === recipe.id);
      if (element) {
        element.count += 1;
      } else {
        const cartItem = { count: 1, recipe };
        newCart.recipes.push(cartItem);
      }
    }
    newCart.size += 1;
    dispatch(setCart({ ...newCart }));
  } catch (error) {
    dispatch(setError(error));
  }
}

export const removeToCart = ({ cart, product, recipe, dispatch }) => {
  if (!cart && !product && !recipe) return;
  try {
    const newCart = { ...cart };
    if (product) {
      const element = newCart?.products?.find((item) => item.product.id === product.id);
      const index = newCart?.products?.findIndex((item) => item.product.id === product.id);
      if (element.count > 1 && index !== -1) {
        element.count -= 1;
      } else if (element.count <= 1 && index !== -1) {
        newCart.products.splice(index, 1);
      } else {
        return;
      }
    }
    if (recipe) {
      const element = newCart?.recipes?.find((item) => item.recipe.id === recipe.id);
      const index = newCart?.recipes?.findIndex((item) => item.recipe.id === recipe.id);
      if (element.count > 1 && index !== -1) {
        element.count -= 1;
      } else if (element.count <= 1 && index !== -1) {
        newCart.recipe.splice(index, 1);
      } else {
        return;
      }
    }
    newCart.size -= 1;
    dispatch(setCart({ ...newCart }));
  } catch (error) {
    dispatch(setError(error));
  }
}

export const deleteToCart = ({ cart, product, recipe, dispatch }) => {
  if (!cart && !product && !recipe) return;
  try {
    const newCart = { ...cart };
    if (product) {
      const element = newCart?.products?.find((item) => item.product.id === product.id);
      const index = newCart?.products?.findIndex((item) => item.product.id === product.id);
      if (index !== -1) {
        newCart.products.splice(index, 1);
        newCart.size -= element.count;
      }
    }
    if (recipe) {
      const element = newCart?.recipes?.find((item) => item.recipe.id === recipe.id);
      const index = newCart?.recipes?.findIndex((item) => item.recipe.id === recipe.id);
      if (index !== -1) {
        newCart.recipes.splice(index, 1);
        newCart.size -= element.count;
      }
    }
    dispatch(setCart({ ...newCart }));
  } catch (error) {
    dispatch(setError(error));
  }
}

export const addToFavorite = ({ wishList, product, recipe, dispatch }) => {
  if (!wishList && !product && !recipe) return;
  if (wishList?.size >= 99) return;
  try {
    const newWishList = { ...wishList };
    if (product) {
      const element = newWishList?.products.find((item) => item.id === product.id);
      if (!element) {
        newWishList.products.push(product);
      }
    }
    if (recipe) {
      const element = newWishList?.recipes.find((item) => item.id === recipe.id);
      if (!element) {
        newWishList.recipes.push(recipe);
      }
    }
    newWishList.size += 1;
    dispatch(setFavorites({ ...newWishList }));
  } catch (error) {
    dispatch(setError(error));
  }
}

export const removeToFavorite = ({ wishList, product, recipe, dispatch }) => {
  if (!wishList && !product && !recipe) return;
  try {
    const newWishList = { ...wishList };
    if (product) {
      const index = newWishList?.products.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        newWishList.products.splice(index, 1);
      }
    }
    if (recipe) {
      const index = newWishList?.recipes.findIndex((item) => item.id === recipe.id);
      if (index !== -1) {
        newWishList.recipes.splice(index, 1);
      }
    }
    newWishList.size -= 1;
    dispatch(setFavorites({ ...newWishList }));
  } catch (error) {
    dispatch(setError(error));
  }
}

export const loginUser = async ({ user, dispatch }) => {
  await axios({
    url: '/auth/login/',
    method: 'post',
    data: { ...user },
  }).then(({ data }) => {
    document.cookie = `id=${data.data.id}`;
    document.cookie = `token=${data.data.token}`;
    document.cookie = `email=${data.data.email}`;
    document.cookie = `type=${data.data.account_type}`;
    document.cookie = `username=${data.data.username}`;
    dispatch(loginRequest(data));
  }).then(() => {
    window.location.href = '/home';
  }).catch((error) => {
    dispatch(setError(error));
    throw new Error('Error');
  });
};

export const registerUser = async ({ user, dispatch }) => {
  const _user = { email: user.email, password: user.password };
  await axios({
    url: '/auth/register/',
    method: 'post',
    data: { ...user },
  }).then(({ data }) => {
    dispatch(registerRequest(data));
  }).then(() => {
    loginUser({ user: _user ,dispatch});
  }).catch((error) => {
    dispatch(setError(error));
    throw new Error('Error');
  });
};

export const logoutUser = ({ dispatch }) => {
  try {
    document.cookie = 'id=';
    document.cookie = 'token=';
    document.cookie = 'email=';
    document.cookie = 'type=';
    document.cookie = 'username=';
    dispatch(logoutRequest());
    window.location.href = '/';
  } catch (error) {
    dispatch({ type: 'SET_ERROR', error });
  }
};
