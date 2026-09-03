# Architecture

React frontend -> Express backend -> public geographic APIs -> MongoDB Atlas.

The frontend should never contain database credentials. External API calls belong in backend service modules. Cache/store public API responses before repeatedly requesting the same area.
