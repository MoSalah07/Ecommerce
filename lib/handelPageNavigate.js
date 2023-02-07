export const handelPageNavigate = (
  queryName,
  queryValue,
  router,
  type = false
) => {

  return router.push(
    {
      pathname: "/search",
      query: { ...router.query, [queryName]: queryValue },
    },
    undefined,
    { shallow: type },
    { scroll: false }
  );
};

// shallow you cant make second request one request only

export const handelQuerySpacing = (query = "", type) => {
  if (type === "query") {
    const typeWithoutSpace = query.split( "" ).join( "" );
    // console.log(typeWithoutSpace)
    return typeWithoutSpace
  } else {
    const typeSpace = query.split( " " ).join( "" );
    // console.log(typeSpace)
    return typeSpace;
  }
};

export const removeQueryParam = (param, router) => {
    const { pathname, query } = router;
  const params = new URLSearchParams( query );
    params.delete(param);
    router.replace({ pathname, query: params.toString() }, undefined, {
      scroll: false,
    });
};
