class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = this._trimQueryStr(queryStr);
    }
  
    _trimQueryStr(queryStr) {
        const trimmedQueryStr = {};
        for (const key in queryStr) {
            if (queryStr.hasOwnProperty(key)) {
                const value = queryStr[key];
                if (typeof value === 'string') {
                    trimmedQueryStr[key.trim()] = value.trim();
                } else {
                    trimmedQueryStr[key.trim()] = value; // Handle non-string values as they are
                }
            }
        }
        return trimmedQueryStr;
    }
  
    search() {
        const keyword = this.queryStr.keyword ? {
            name: { $regex: this.queryStr.keyword, $options: 'i' },
        } : {};
  
        console.log('Search Keyword:', keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }
  
    filter() {
        const queryCopy = { ...this.queryStr };
  
        // Removing some fields for category
        const removeFields = ['keyword', 'page', 'limit'];
        removeFields.forEach(el => delete queryCopy[el]);
  
        // Advanced filtering for price, ratings, etc.
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
  
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
  
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        console.log(`Current Page: ${currentPage}, Skip: ${skip}, Limit: ${resultPerPage}`);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
  }
  
  module.exports = ApiFeatures;
  