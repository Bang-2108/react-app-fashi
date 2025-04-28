import React, { useState } from 'react';

const Food = () => {
  const [menu] = useState([
    { id: 1, name: 'Cà phê sữa', price: 12000 },
    { id: 2, name: 'Cà phê đá', price: 10000 },
    { id: 3, name: 'Sting dâu', price: 8000 },
    { id: 4, name: 'Trà đá', price: 2000 },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [money, setMoney] = useState('');
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleOrder = () => {
    const selectedFoods = menu.filter(item => selectedItems.includes(item.id));
    const totalPrice = selectedFoods.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
    setRemaining(money - totalPrice);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <div style={{ backgroundColor: '#e0f3ff', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>MENU</h2>

        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
          {menu.map(item => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '8px 0', 
                borderBottom: '1px dotted gray'
              }}
            >
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  style={{ marginRight: '10px' }}
                />
                {item.name}
              </label>
              <span>{item.price.toLocaleString()}đ</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <input
            type="number"
            placeholder="Nhập số tiền hiện có"
            value={money}
            onChange={(e) => setMoney(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <button 
            onClick={handleOrder} 
            style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Đặt hàng
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Kết quả:</h3>
          <p><strong>Tổng tiền món đã chọn:</strong> {total.toLocaleString()}đ</p>
          <p><strong>Tiền dư còn lại:</strong> {remaining.toLocaleString()}đ</p>
        </div>
      </div>
    </div>
  );
};

export default Food;
