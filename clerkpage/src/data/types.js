export default function types() {
    return [
        {
            id: 0,
            name: "Cupcake",
            img: 'https://vncooking.com/files/cuisine/2019/01/26/muc-nuong-sa-te-cay-2c2j.jpg'
        },
        {
            id: 1,
            name: "Sea Food",
            img: 'https://vncooking.com/files/cuisine/2019/01/26/muc-nuong-sa-te-cay-2c2j.jpg'
        },
        {
            id: 2,
            name: "Juice",
            img: 'https://popeyes.vn/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/coca.png'
        },
        {
            id: 3,
            name: "Coca",
            img: 'https://popeyes.vn/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/coca.png'
        },
        { 
            id: 4, 
            name: "Orange Juice",
            img: 'https://popeyes.vn/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/coca.png'
        },
        { 
            id: 5, 
            name: "1",
            img: 'https://p.kindpng.com/picc/s/63-636174_cupcake-chocolate-brownie-ganache-torte-vanilla-cupcake-vector.png'
        },
        { 
            id: 6, 
            name: "2",
            img: 'https://popeyes.vn/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/coca.png'
        },
        { 
            id: 7, 
            name: "3",
            img: 'https://p.kindpng.com/picc/s/63-636174_cupcake-chocolate-brownie-ganache-torte-vanilla-cupcake-vector.png'
        },
        { 
            id: 8, 
            name: "4",
            img: 'https://vncooking.com/files/cuisine/2019/01/26/muc-nuong-sa-te-cay-2c2j.jpg'
        },
        {
            id: 9,
            name: "5",
            img: 'https://popeyes.vn/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/coca.png'
        }
    ]
}

export async function queryTypes()
{
	const response = await fetch('http://d52a-14-167-135-223.ngrok.io/api/dishes_management/types/all');
	const typeList = await response.json();
	return typeList;
}
