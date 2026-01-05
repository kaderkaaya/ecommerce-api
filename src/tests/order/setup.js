import sequelize from '../../config/config.js';

import '../../models/order/associates.js';
import '../../models/user/associates.js';
import '../../models/product/associates.js';
import '../../models/cart/associates.js';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterEach(async () => {
     await sequelize.sync({ force: true });
});
afterAll(async () => {
    await sequelize.close();
});
