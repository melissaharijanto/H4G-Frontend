import { Task } from './Task';
import { Transaction } from './Transaction';

export interface User {
    user: {
        uid: string;
        name: string;
        cat: string;
        email: string;
        credit: number;
        is_active: boolean;
    };
    transactions: Transaction[];
    tasks: Task[];
}
