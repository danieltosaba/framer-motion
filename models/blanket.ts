interface Price {
    small?: number;
    regular?: number;
    large?: number;
}
interface Size {
    small?: string;
    regular?: string;
    large?: string;
}
interface Image {
    url: string[];
    cover: string;
}
export interface Blanket {
    id: number;
    name: string;
    description: string;
    price: Price;
    size: Size;
    imageUrl: Image;
}