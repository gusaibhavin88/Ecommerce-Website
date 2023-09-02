class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    if (this.queryStr.keyword) {
      const keyword = {
        name: {
          $regex: this.queryStr.keyword,
          $options: "i", // Case Insensitive Aa
        },
      };
      this.query = this.query.find(keyword);
    }
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // Remove some fields for filtering
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter by Price and Rating and catagery
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    console.log(resultPerPage);
    console.log(this.queryStr.page);
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.skip(skip).limit(resultPerPage);

    return this;
  }
}

export default ApiFeatures;
