export class ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;

    constructor(success: boolean, data?: T, message?: string) {
        this.success = success;
        this.message = message;
        this.data = data;

    }
}