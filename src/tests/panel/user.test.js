import { jest } from '@jest/globals';

jest.unstable_mockModule('../../config/config.js', () => ({
    default: {
        define: jest.fn()
    }
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mock-jwt-token'),
    verify: jest.fn(() => ({ id: 1, role: 1 }))
}));

jest.unstable_mockModule('../../utils/hash-pasword.js', () => ({
    default: {
        verifyPassword: jest.fn(),
        hashPassword: jest.fn(),

    }
}));

jest.unstable_mockModule('../../modules/panel/data/token.js', () => ({
    default: {
        findByUserId: jest.fn(),
        updateRefreshToken: jest.fn(),

    }
}));

jest.unstable_mockModule('../../models/panel-user/user.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

//burda ilk olarak config dosyamızı import ediyoruz çünkü
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

const { default: HashHelper } = await import(
    '../../utils/hash-pasword.js'
);

const { default: TokenData } = await import(
    '../../modules/panel/data/token.js'
);


describe('create-user', () => {
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
        HashHelper.hashPassword.mockResolvedValue(mockUser.password);
        const result = await PanelUserService.createUser(mockUser);

        expect(result).toEqual(mockUser);
        expect(PanelUserModel.create).toHaveBeenCalledTimes(1);
    });
});

describe('update-user', () => {
    test('Should update user successfully', async () => {
        const mockUser = {
            userId: 1,
            name: 'kaderka',
            surname: 'kaya'
        };

        PanelUserModel.update.mockResolvedValue([1]);
        PanelUserModel.findOne.mockResolvedValue(mockUser);

        const result = await PanelUserService.updateUser(mockUser);

        expect(result).toEqual(mockUser);
        expect(PanelUserModel.update).toHaveBeenCalledTimes(1);
        expect(PanelUserModel.findOne).toHaveBeenCalledTimes(2);
    });
});

describe('login', () => {
    test('Should login user successfully', async () => {
        const mockUser = {
            userId: 1,
            phoneNumber: '533087777',
            password: '1234',
            hashedPassword: '$2a$12$O33nRsdOmOgt4nyIpvnCfuXosBZF2okMIE5AkoW6WnNtE786Crpye'
        };

        PanelUserModel.findOne.mockResolvedValue(mockUser);
        HashHelper.verifyPassword.mockResolvedValue(true);
        TokenData.findByUserId.mockResolvedValue(null);
        const token = await TokenData.updateRefreshToken.mockResolvedValue({
            userId: 1,
            token: 'mock-token',
            expiresAt: new Date(Date.now() + 100000)
        });

        const result = await PanelUserService.login({
            phoneNumber: '533087777',
            password: '1234',
        });

        expect(result.accessToken).toBe('mock-jwt-token');
        expect(result.refreshToken).toBe('mock-jwt-token');

        expect(PanelUserModel.findOne).toHaveBeenCalledTimes(3);
    });
});

describe('update-password', () => {
    test('Should update-password user successfully', async () => {
        const mockUser = {
            userId: 1,
            oldPassword: '1234',
            newPassword: '12345'
        };

        PanelUserModel.update.mockResolvedValue([1]);
        PanelUserModel.findOne.mockResolvedValue(mockUser);

        const result = await PanelUserService.updatePassword(mockUser);

        expect(result.newPassword).toEqual(mockUser.newPassword);
        expect(PanelUserModel.update).toHaveBeenCalledTimes(2);
        expect(PanelUserModel.findOne).toHaveBeenCalledTimes(5);
    });
});

describe('get-user', () => {
    test('Should get user successfully', async () => {
        const mockUser = {
            userId: 1,
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
        PanelUserModel.findOne.mockResolvedValue(mockUser);

        const result = await PanelUserService.getUser(mockUser);

        expect(result).toEqual(mockUser);
        expect(PanelUserModel.findOne).toHaveBeenCalledTimes(6);
    });
});