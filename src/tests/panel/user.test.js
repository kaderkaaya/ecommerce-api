import PanelUserService from '../../modules/panel/services/user.js';
import PanelUserModel from '../../models/panel-user/user.js';

jest.mock(PanelUserModel);

describe('createUser', () => {
    test('Should create user successfully', async () => {
        const mockUser = { id: 1, name: 'kado', surname: 'kaya', email: 'test@test.com', phoneNumber: '5302091777', role: 1, password: 1234, userStatus: 1, verifyCode: 'ADCD', verifyPhone: true };

        PanelUserModel.create.mockResolvedValue(mockUser);

        const result = await PanelUserService.createUser({ name: 'kado', surname: 'kaya', email: 'test@test.com', phoneNumber: '5302091777', role: 1, password: 1234, userStatus: 1, verifyCode: 'ADCD', verifyPhone: true});
        
        expect(result).toEqual(mockUser);
        expect(User.create).toHaveBeenCalled();
    });
});