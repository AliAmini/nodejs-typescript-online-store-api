import User, { IUser } from "@models/User/User.model";
import Product, { IProduct } from '@models/Product/Product.model';
import { getNewObjectId } from '@helpers/General.helper';
import Category, { ICategory } from "@models/Category/Category.model";

export const user: IUser = {
  _id: getNewObjectId(),
  email: 'email@gmail.com',
  password: '123456',
  name: 'User 1',
};

interface ISeedCategory extends Omit<ICategory, 'children'> {
  children: ICategory[]
}

const categories : ISeedCategory[] = [
  {
    _id: getNewObjectId(),
    name: 'Category 1 (10% off)',
    discountPercent: 10,
    children: [
      {
        _id: getNewObjectId(),
        name: 'Sub Cat 1 of Category 1'
      }
    ]
  },

  {
    _id: getNewObjectId(),
    name: 'Category 2',
    children: [
      {
        _id: getNewObjectId(),
        name: 'Sub Cat 1 of Category 2 (7% off)',
        discountPercent: 7,
      },
      {
        _id: getNewObjectId(),
        name: 'Sub Cat 2 of Category 2',
        discountPercent: 0,
      }
    ]
  }
];


const products : IProduct[] = [
  {
    _id: getNewObjectId(),
    name: 'Product 1 (5% off product discount)',
    code: '1',
    discountPercent: 5,
    category: undefined
  },
  {
    _id: getNewObjectId(),
    name: 'Product 2 (10% off Parent category discount)',
    code: '2',
    discountPercent: 0,
    category: categories[0].children[0]._id
  },
  {
    _id: getNewObjectId(),
    name: 'Product 3 (7% off Sub-category discount)',
    code: '3',
    discountPercent: 0,
    category: categories[1].children[0]._id
  },
  {
    _id: getNewObjectId(),
    name: 'Product 4 (No product & category discount)',
    code: '4',
    discountPercent: 0,
    category: categories[1].children[1]._id
  },
]

const createUser = async () => {
  const _user = await User.create(user);
};


const createCategories = async () => {
  await Promise.all(
    categories.map(async (parentCategory) => {
      const subCategories = parentCategory.children;

      // 1. create parent cat
      const newParentCategoryData = {
        ...parentCategory,
        children: parentCategory.children.map(subCat => subCat._id),
      }
      const newParentCategoryDoc = await Category.create(newParentCategoryData);

      // 2. create sub cats
      await Promise.all(
        subCategories.map(async (subCategory) => {
          const newSubCategoryData = {
            ...subCategory,
            parent: parentCategory._id,
          };
          const newSubCategoryDoc = await Category.create(newSubCategoryData);
        })
      )
    })
  )
};

const createProducts = async () => {
  await Promise.all(
    products.map(async (product) => {
      const newProductDoc = await Product.create(product);
    })
  ) 
};



export const runSeedDatabase = async () => {
  let seedError : string | undefined = undefined;

  try {
    console.log('seed > start to create user');
    await createUser();
    
    console.log('seed > start to create categories');
    await createCategories();

    console.log('seed > start to create products');
    await createProducts();

    console.log('seed > Successfully finished.');
  } catch (e) {
    console.log('Seed Database Error:', e);
  }
};

