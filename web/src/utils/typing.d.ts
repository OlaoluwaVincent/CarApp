export interface CarCredentials {
    id: string;
    name: string;
    carType: string;
    steering: string;
    capacity: string;
    gasoline: string;
    amount: string;
    description: string;
    rented: boolean;
    tag: string;
    tagDescription: string;
    region: string;
    state: string;
    ownerId: string;
    carImageId: string;
    carImage: {
        images: string[];
    };
}

export interface Product {
    data: CarCredentials[]
    length: number;
    totalCount: number;
    totalPages: number;
    page: number
}

export type GetProductsData = {
    sort?: string;
    page?: string;
    search?: string;
    type?: string;
    steering?: string;
};

export type InitialState = {
    data: Product | null;
    loading: boolean;
    error: string | undefined;
};

interface AuthData {
	data: {
		id: string;
		email: string;
		name: string;
		role: string;
		address: string;
		profileImg: string;
		state: string;
		region: string;
	};
	token: string;
}

export interface Error {
	message: string;
	error: string;
	statusCode: number;
}
