'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const filterQuery = exports.filterQuery = req => {
  const { limit = 20, offset, status } = req.query;
  req.query.limit = limit > 19 ? 20 : +limit;
  req.query.status = status ? status : 'active';
  req.query.offset = offset ? +offset : 0;
};
//# sourceMappingURL=filter-query.js.map