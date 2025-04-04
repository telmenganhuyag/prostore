'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { CartItem } from '@/types';
import { toast } from 'sonner';
import { addItemToCart } from '@/lib/actions/cart.actions';

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error('This is an error message', {
        className:
          'flex items-center gap-1 bg-red-500 text-white p-4 rounded-lg shadow-md',
      });
      return;
    }

    // Handle success add to cart
    toast(`${item.name} added to cart`, {
      action: (
        <Button
          className="bg-primary cursor-pointer text-white hover:bg-gray-800"
          onClick={() => {
            router.push('/cart');
          }}
        >
          Go To Cart
        </Button>
      ),
    });

    // toast.custom((t) => (
    //   <div className="flex items-center gap-4 bg-white p-4 rounded shadow-md">
    //     <span className="text-sm">{item.name} added to cart</span>
    //     <button
    //       className="bg-primary text-white px-4 py-1 rounded text-sm whitespace-nowrap hover:bg-gray-800"
    //       onClick={() => {
    //         router.push('/cart');
    //         toast.dismiss(t); // dismiss the toast manually after action
    //       }}
    //     >
    //       Go To Cart
    //     </button>
    //   </div>
    // ));
  };

  return (
    <Button
      className="w-full cursor-pointer"
      type="button"
      onClick={handleAddToCart}
    >
      Add To Cart
    </Button>
  );
};

export default AddToCart;
