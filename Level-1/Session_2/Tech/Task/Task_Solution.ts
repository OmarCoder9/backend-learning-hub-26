//Part 1.1
let totalBooks: number = 0;
let libraryName: string;
let isOpen: boolean;
let lateFeePerDay: number;
let maxBooksPerPerson: number;
let currentDate: string;
//Part 1.2
type Status = "available" | "borrowed" | "reserved";
interface Book {
  id: number;
  title: string;
  author: string;
  publishYear: number;
  status: Status;
  pages: number;
}

//Part 1.3
interface Magazine extends Book {
  issueNumber: number;
  monthlySubscription: boolean;
}
//Part 1.4
let b1: Book = {
  id: 2024,
  title: "Harry Potter",
  author: "JK Rowling",
  publishYear: 2002,
  status: "available",
  pages: 503,
};

totalBooks++;

let m1: Magazine = {
  id: 2025,
  title: "Test",
  author: "Al Ahram",
  publishYear: 2006,
  status: "borrowed",
  pages: 30,
  issueNumber: 123,
  monthlySubscription: true,
};
totalBooks++;

console.log(b1);
console.log(m1);

//Part 2.1 && Part 2.2
let b2: Book = {
  id: 2022,
  title: "Atomic Habits",
  author: "Unknown Man",
  publishYear: 2022,
  status: "reserved",
  pages: 180,
};
let b3: Book = {
  id: 202,
  title: "Sherlock",
  author: "Known Man",
  publishYear: 2007,
  status: "available",
  pages: 1003,
};

let books: Book[] = [b1, b2, b3];
let totalPages:number = 0;
for (let i:number = 0; i < books.length; i++) {
    totalPages += books[i]?.pages ?? 0
    if(books[i]?.status === "available") 
        console.log(books[i])
}

//Part 3.1
//The utility types allows you to transform existing types into a new ones it create a variations of the interface but make it slihhtly different like changing ome attribute to be readonly or to be optional without repeating the same interface


//Part 3.2
const updateBook = (id: number, updates: Partial<Book>) =>{
  console.log(`updating user with id ${id}`);
  //I have no idea if this is what you want or no :)
}


//Part 3.3
type BookShortInfo = Pick<Book, "title" | "author">;
const displayInfo: BookShortInfo = {
  title:b1.title,
  author:b1.author,
}
console.log("Short Info:", displayInfo);


//Part 3.4
type PublicView = Omit<Book, "pages">;
const publicBook: PublicView = {
  id:b2.id,
  title: b2.title,
  author: b2.author,
  status: b2.status,
  publishYear: b2.publishYear
}
console.log("Public Info:", publicBook);


//Part 3.5
type ReadonlyBook = Readonly<Book>;

const importantBook:ReadonlyBook = {
  id: 12315,
  title: "moment of silance",
  author: "Me",
  publishYear: 2026,
  status:"available",
  pages:0
}
//importantBook.author = "Omar" 
//this will give an error because it is a readonly value and you can't change it


//Part 3.6
type MandatoryBook = Required<Book>;
const strictBook:MandatoryBook = {
  id: 1,
  title: "How to know if you can't know",
  author:"Omar",
  publishYear:2025,
  status:"available",
  pages:650
}


//Part 4
let bookId:number = 2026;
let foundBook: Book | undefined;

for (let i:number = 0; i < books.length; i++) {
  if(books[i]?.id === bookId){
    foundBook = books[i]
    break;
  }  
}

if(foundBook){
  console.log("Found", foundBook);
}else{
  console.log("Book not Found");
}