<?php
class ControllerExtensionModuleWish extends Controller {
  public function index() {

    $this->load->language('account/wishlist');
    $this->load->model('account/wishlist');
    $this->load->model('catalog/product');
    $this->load->model('tool/image');
    $data['wishlist'] = $this->url->link('account/wishlist', '', true);

    $data['products'] = array();

  if ($this->customer->isLogged()) {
      $data['text_wishlist'] = sprintf($this->language->get('text_wishlist'), $this->model_account_wishlist->getTotalWishlist());
    } else {
      $data['text_wishlist'] = sprintf($this->language->get('text_wishlist'), (isset($this->session->data['wishlist']) ? count($this->session->data['wishlist']) : 0));
    }

    $results = $this->model_account_wishlist->getWishlist();

    foreach ($results as $result) {
      $product_info = $this->model_catalog_product->getProduct($result['product_id']);

      if ($product_info) {
        if ($product_info['image']) {
          $image = $this->model_tool_image->resize($product_info['image'], $this->config->get('theme_' . $this->config->get('config_theme') . '_image_wishlist_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_wishlist_height'));
        } else {
          $image = false;
        }

        if ($product_info['quantity'] <= 0) {
          $stock = $product_info['stock_status'];
        } elseif ($this->config->get('config_stock_display')) {
          $stock = $product_info['quantity'];
        } else {
          $stock = $this->language->get('text_instock');
        }

        if ($this->customer->isLogged() || !$this->config->get('config_customer_price')) {
          $price = $this->currency->format($this->tax->calculate($product_info['price'], $product_info['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency']);
        } else {
          $price = false;
        }

        if ((float)$product_info['special']) {
          $special = $this->currency->format($this->tax->calculate($product_info['special'], $product_info['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency']);
        } else {
          $special = false;
        }

        $data['products'][] = array(
          'product_id' => $product_info['product_id'],
          'thumb'      => $image,
          'name'       => $product_info['name'],
          'model'      => $product_info['model'],
          'stock'      => $stock,
          'price'      => $price,
          'special'    => $special,
          'href'       => $this->url->link('product/product', 'product_id=' . $product_info['product_id']),
          'remove'     => $this->url->link('account/wishlist', 'remove=' . $product_info['product_id'])
        );
      } else {
        $this->model_account_wishlist->deleteWishlist($result['product_id']);
      }
     }
     return $this->load->view('extension/module/wish', $data);
  }
  public function info() {
    $this->response->setOutput($this->index());
  }

  public function add() {
		$this->load->language('account/wishlist');

		$json = array();

		if (isset($this->request->post['product_id'])) {
			$product_id = $this->request->post['product_id'];
		} else {
			$product_id = 0;
		}

		$this->load->model('catalog/product');

		$product_info = $this->model_catalog_product->getProduct($product_id);

		if ($product_info) {
			if ($this->customer->isLogged()) {
				// Edit customers cart
				$this->load->model('account/wishlist');

				$this->model_account_wishlist->addWishlist($this->request->post['product_id']);

				$json['success'] = sprintf($this->language->get('text_success'), $this->url->link('product/product', 'product_id=' . (int)$this->request->post['product_id']), $product_info['name'], $this->url->link('account/wishlist'));

				$json['total'] = sprintf($this->language->get('text_wishlist'), $this->model_account_wishlist->getTotalWishlist());

			} else {
				if (!isset($this->session->data['wishlist'])) {
					$this->session->data['wishlist'] = array();
				}

				$this->session->data['wishlist'][] = $this->request->post['product_id'];

				$this->session->data['wishlist'] = array_unique($this->session->data['wishlist']);

				$json['success'] = sprintf($this->language->get('text_login'), $this->url->link('account/login', '', true), $this->url->link('account/register', '', true), $this->url->link('product/product', 'product_id=' . (int)$this->request->post['product_id']), $product_info['name'], $this->url->link('account/wishlist'));

				$json['total'] = sprintf($this->language->get('text_wishlist'), (isset($this->session->data['wishlist']) ? count($this->session->data['wishlist']) : 0));

			}
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}

}
//END
