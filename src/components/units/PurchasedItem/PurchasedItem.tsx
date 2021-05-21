import React, { ReactElement } from 'react';
import Styled from './PurchasedItem.styles';
import defaultImageURL from '../../../assets/images/brave.png';
import Button from '../../shared/Button/Button';
import * as T from '../../../types';
import { toPriceFormat } from '../../../utils';

interface IProps {
  item: T.CartItem;
  onClick: (product: T.Product) => void;
}

const PurchasedItem = (props: IProps): ReactElement => {
  const { item, onClick } = props;
  const { quantity, product } = item;
  const { name, price, image } = product;

  const totalPrice = price * quantity;

  const handleClick = () => {
    onClick(product);
  };

  return (
    <Styled.Root>
      <Styled.Image src={image ?? defaultImageURL} alt={name} />
      <Styled.Info>
        <Styled.Title>{name}</Styled.Title>
        <Styled.Detail>
          {toPriceFormat(totalPrice)}원 / 수량 : {quantity}개
        </Styled.Detail>
      </Styled.Info>
      <Styled.ButtonWrapper>
        <Button size={T.ButtonSize.REGULAR} text="장바구니" onClick={handleClick} />
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
};

export default PurchasedItem;
