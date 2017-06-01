export class Global {
    public static BASE_USER_ENDPOINT = 'api/userapi/'; // original from guide.

    // added below to try attribute routing on API end.
    public static UserGet: string = 'api/user/';
    public static UserAdd: string = 'api/user/add/';
    public static UserEdit: string = 'api/user/edit/';
    public static UserDelete: string = 'api/user/delete/';
}