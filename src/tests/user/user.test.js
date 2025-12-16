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

jest.unstable_mockModule('../../modules/user/data/token.js', () => ({
    default: {
        findByUserId: jest.fn(),
        updateRefreshToken: jest.fn(),

    }
}));

jest.unstable_mockModule('../../models/user/user.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

const { default: UserService } = await import(
    '../../modules/user/services/user.js'
);

const { default: UserModel } = await import(
    '../../models/user/user.js'
);

const { default: HashHelper } = await import(
    '../../utils/hash-pasword.js'
);

const { default: TokenData } = await import(
    '../../modules/user/data/token.js'
);


describe('create-user', () => {
    test('Should create user successfully', async () => {
        const mockUser = {
            id: 1,
            name: 'kado',
            surname: 'kaya',
            email: 'test@test.com',
            phoneNumber: '533087777',
            password: '1234',
            userStatus: 1,
        };

        UserModel.create.mockResolvedValue(mockUser);
        HashHelper.hashPassword.mockResolvedValue(mockUser.password);
        const user = await UserService.createUser(mockUser);

        expect(user).toEqual(mockUser);
        expect(UserModel.create).toHaveBeenCalledTimes(1);
    });
});

describe('update-user', () => {
    test('Should update user successfully', async () => {
        const mockUser = {
            userId: 1,
            name: 'kaderka',
            surname: 'kaya'
        };

        UserModel.update.mockResolvedValue([1]);
        UserModel.findOne.mockResolvedValue(mockUser);

        const result = await UserService.updateUser(mockUser);

        expect(result).toEqual(mockUser);
        expect(UserModel.update).toHaveBeenCalledTimes(1);
        expect(UserModel.findOne).toHaveBeenCalledTimes(2);
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

        UserModel.findOne.mockResolvedValue(mockUser);
        HashHelper.verifyPassword.mockResolvedValue(true);
        TokenData.findByUserId.mockResolvedValue(null);

        const result = await UserService.login({
            phoneNumber: '533087777',
            password: '1234',
        });

        expect(result.accessToken).toBe('mock-jwt-token');
        expect(result.refreshToken).toBe('mock-jwt-token');

        expect(UserModel.findOne).toHaveBeenCalledTimes(3);
    });
});

describe('update-password', () => {
    test('Should update-password user successfully', async () => {
        const mockUser = {
            userId: 1,
            oldPassword: '1234',
            newPassword: '12345'
        };

        UserModel.update.mockResolvedValue([1]);
        UserModel.findOne.mockResolvedValue(mockUser);

        const result = await UserService.updatePassword(mockUser);

        expect(result.newPassword).toEqual(mockUser.newPassword);
        expect(UserModel.update).toHaveBeenCalledTimes(2);
        expect(UserModel.findOne).toHaveBeenCalledTimes(5);
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
        UserModel.findOne.mockResolvedValue(mockUser);

        const result = await UserService.getUser(mockUser);

        expect(result).toEqual(mockUser);
        expect(UserModel.findOne).toHaveBeenCalledTimes(6);
    });
});