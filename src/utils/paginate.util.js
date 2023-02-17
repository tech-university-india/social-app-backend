const paginate = ( pageDate = Date.now(), page = 1, size = 10) => {
    const offset = (page - 1) * size;
    const limit = offset + size;
    const pageTimeStamp = new Date(Number(pageDate));
    return { pageTimeStamp, limit, offset };
};

module.exports = { paginate };