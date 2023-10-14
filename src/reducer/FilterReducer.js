const FilterReducer = (state, action) => {
  switch (action.type){
    case "LOAD_FILTER_PRODUCTS":
        return {
            ...state,
            filter_products: [...action.payload],
            all_products: [...action.payload],
        };
    case "SET_GRID_VIEW" :
      return{
        ...state,
        grid_view: true,
      };

      case "SET_LIST_VIEW" :
      return{
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUES":
      let userSortValue = document.getElementById("sort");
      let sort_value = userSortValue.options[userSortValue.selectedIndex].value;

      return {
        ...state,
        sorting_value: sort_value,
      }
    case "SORTING_PRODUCTS":
      let newSortData;
      let tempSortData = action.payload;

      if (state.sorting_value === "lowest"){
        newSortData = tempSortData.sort((a,b) =>{
          return a.price - b.price;
        });
      };

      if (state.sorting_value === "highest"){
        newSortData = tempSortData.sort((a,b) =>{
          return b.price - a.price;
        });
      };
      
      if(state.sorting_value === "a-z"){
        newSortData = tempSortData.sort((a,b) => {
          return a.name.localeCompare(b.name);
        });
      };

      if(state.sorting_value === "z-a"){
        newSortData = tempSortData.sort((a,b) => {
          return b.name.localeCompare(a.name);
        });
      };

      return{
        ...state,
        filter_products: newSortData,
      };
    
    case "UPDATE_FILTERS_VALUE":
      const {name, value} = action.payload;
      return{
        ...state,
        filters:{
          ...state.filters,
          [name]: value,
        },
    };

    case "FILTER_PRODUCTS":
      let {all_products} = state;
      let tempFilterProducts = [...all_products];

      const {text, category} = state.filters;

      if(text) {
        tempFilterProducts = tempFilterProducts.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        });
      }

      if(category !== "all") {
        tempFilterProducts = tempFilterProducts.filter((curElem) => {
          return curElem.category===category;
        });
      }

      return {
        ...state,
        filter_products: tempFilterProducts,
      }

    default :
      return state;
  }
}

export default FilterReducer;