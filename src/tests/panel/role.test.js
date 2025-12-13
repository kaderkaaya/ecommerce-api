import { jest } from '@jest/globals';

jest.unstable_mockModule('../../config/config.js', () => ({
    default: {
        define: jest.fn()
    }
}));

jest.unstable_mockModule('../../models/panel-user/role.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));
const { default: RoleService } = await import(
    '../../modules/panel/services/role.js'
);

const { default: RoleModel } = await import(
    '../../models/panel-user/role.js'
);


describe('create-role', () => {
    test('Should create role successfully', async () => {
        const mockRole = {
            id: 1,
            userId: 1,
            name: 'role',
            description: "this is a role",
            color: "12345678",
            authEndpoints: ["role1", "role2", "role3"]
        };

        RoleModel.create.mockResolvedValue(mockRole);
        const result = await RoleService.createRole(mockRole);

        expect(result).toEqual(mockRole);
        expect(RoleModel.create).toHaveBeenCalledTimes(1);
    });
});

describe('update-role', () => {
    test('Should update role successfully', async () => {
        const mockRole = {
            roleId: 1,
            name: 'role2',
            description: "this is a role",
        };

        RoleModel.update.mockResolvedValue([1]);
        RoleModel.findOne.mockResolvedValue(mockRole)
        const role = await RoleService.updateRole(mockRole);

        expect(role).toEqual(mockRole);
        expect(RoleModel.update).toHaveBeenCalledTimes(1);
        expect(RoleModel.findOne).toHaveBeenCalledTimes(2);
    });
});

describe('delete-role', () => {
    test('Should update role successfully', async () => {
        const mockRole = {
            roleId: 1,
        };

        RoleModel.update.mockResolvedValue([1]);
        RoleModel.findOne.mockResolvedValue(mockRole)
        const role = await RoleService.deleteRole(mockRole);

        expect(role).toEqual(mockRole);
        expect(RoleModel.update).toHaveBeenCalledTimes(2);
        expect(RoleModel.findOne).toHaveBeenCalledTimes(4);
    });
});

