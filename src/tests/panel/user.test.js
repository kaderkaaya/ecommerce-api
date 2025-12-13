import { jest } from '@jest/globals';

jest.unstable_mockModule('../../config/config.js', () => ({
    default: {
        define: jest.fn()
    }
}));

jest.unstable_mockModule('../../models/panel-user/user.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn()
    }
}));
//burda ilk olarak confic dosyamızı import ediyoruz çünkü
// mockladığımızda dbye mocklamaya çalışıyoruz ve hata alıyoruz.
//burda db ile test etmememiz gerek 
//daha sonra servislerimizi ve modelimi mockluyoruz
//Mock’lar önce kurulur
//Sonra dosya mock’lu haliyle import edilir
//Sequelize dosyası hiç çalışmaz
//jest.mock yerinne jest.unstable_mockModule kullanıyoruz çünkü ESM6 kullandık
//mock'lar importtan önce çalışması gerek.  
const { default: PanelUserService } = await import(
    '../../modules/panel/services/user.js'
);

const { default: PanelUserModel } = await import(
    '../../models/panel-user/user.js'
);

describe('createUser', () => {
    test('Should create user successfully', async () => {
        const mockUser = {
            id: 1,
            name: 'kado',
            surname: 'kaya',
            email: 'test@test.com',
            phoneNumber: '533087777',
            role: 1,
            password: '1234',
            userStatus: 1,
            verifyCode: 'ADCD',
            verifyPhone: true
        };

        PanelUserModel.create.mockResolvedValue(mockUser);

        const result = await PanelUserService.createUser(mockUser);

        expect(result).toEqual(mockUser);
        expect(PanelUserModel.create).toHaveBeenCalledTimes(1);
    });
});
