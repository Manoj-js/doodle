export class loginApi_Response {

    status: number;
    message: string;
    err?:{};
    data: {
        userType: number,
        _id: string,
        fullName: string,
        email: string,
        loggedIn: string,
        updatedAt: string,
        token:string

}
}

export class ProfileDetailsApi_Response{

    status: number
    message: string;
    data: {
        userType: 2,
        _id:string;
        fullName: string,
        email: string,
        loggedIn: string
    }

}
