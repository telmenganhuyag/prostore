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
      toast.error('This is an error message');
      return;
    }

    // Handle success add to cart
    toast(res.message, {
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
  };

  return (
    <Button
      className="w-full cursor-pointer"
      type="button"
      onClick={handleAddToCart}
    >
      <Plus />
      Add To Cart
    </Button>
  );
};

export default AddToCart;
