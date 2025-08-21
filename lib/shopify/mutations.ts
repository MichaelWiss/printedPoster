export const CreateCartMutation = `
  mutation CartCreate {
    cartCreate {
      cart {
        id
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

export const AddToCartMutation = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`
