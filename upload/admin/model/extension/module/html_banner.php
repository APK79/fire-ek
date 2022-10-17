<?php 
class ModelExtensionModuleHtmlBanner extends Model {

    public function install() {
		$sql = " SHOW TABLES LIKE '".DB_PREFIX."html_banner'";
		$query = $this->db->query( $sql );
		if( count($query->rows) >0 )
			return true;
		$sql = array();

		$sql[] = "CREATE TABLE IF NOT EXISTS `".DB_PREFIX."html_banner` (
				  `banner_id` int NOT NULL AUTO_INCREMENT,
				  `name` varchar(64) DEFAULT NULL,
				  `status` tinyint DEFAULT NULL,
				  PRIMARY KEY (`banner_id`)
				) ENGINE=MyISAM DEFAULT CHARSET=UTF8MB3 ROW_FORMAT=DYNAMIC;";
				
		$sql[] = "CREATE TABLE `".DB_PREFIX."html_banner_image` (
				  `banner_image_id` int NOT NULL AUTO_INCREMENT,
				  `banner_id` int NOT NULL,
                  `language_id` int NOT NULL,
                  `title` varchar(128) DEFAULT NULL,
				  `link` varchar(255) DEFAULT NULL,
				  `image` varchar(255) DEFAULT NULL,
                  `setting` text DEFAULT NULL,
				  `sort_order` int NOT NULL DEFAULT '0',
				  PRIMARY KEY (`banner_image_id`)
				) ENGINE=MyISAM DEFAULT CHARSET=UTF8MB3 ROW_FORMAT=DYNAMIC;";
				
		foreach( $sql as $q ){
			$query = $this->db->query( $q );
		}

	}
	public function uninstall() {		
		$this->db->query("DROP TABLE IF EXISTS `" . DB_PREFIX . "html_banner`");
		$this->db->query("DROP TABLE IF EXISTS `" . DB_PREFIX . "html_banner_image`");
	}

	public function addBanner($data) {
		$this->db->query("INSERT INTO " . DB_PREFIX . "html_banner SET name = '" . $this->db->escape($data['name']) . "', status = '" . (int)$data['status'] . "'");

		$banner_id = $this->db->getLastId();

		if (isset($data['banner_image'])) {
			foreach ($data['banner_image'] as $language_id => $value) {
				foreach ($value as $banner_image) {
					$this->db->query("INSERT INTO " . DB_PREFIX . "html_banner_image SET banner_id = '" . (int)$banner_id . "', language_id = '" . (int)$language_id . "', title = '" .  $this->db->escape($banner_image['title']) . "', link = '" .  $this->db->escape($banner_image['link']) . "', image = '" .  $this->db->escape($banner_image['image']) . "', setting = '" . $this->db->escape($banner_image['setting'])  . "', sort_order = '" .  (int)$banner_image['sort_order'] . "'");
				}
			}
		}

		return $banner_id;
	}

	public function editBanner($banner_id, $data) {
		$this->db->query("UPDATE " . DB_PREFIX . "html_banner SET name = '" . $this->db->escape($data['name']) . "', status = '" . (int)$data['status'] . "' WHERE banner_id = '" . (int)$banner_id . "'");

		$this->db->query("DELETE FROM " . DB_PREFIX . "html_banner_image WHERE banner_id = '" . (int)$banner_id . "'");

		if (isset($data['banner_image'])) {
			foreach ($data['banner_image'] as $language_id => $value) {
				foreach ($value as $banner_image) {
					$this->db->query("INSERT INTO " . DB_PREFIX . "html_banner_image SET banner_id = '" . (int)$banner_id . "', language_id = '" . (int)$language_id . "', title = '" .  $this->db->escape($banner_image['title']) . "', link = '" .  $this->db->escape($banner_image['link']) . "', image = '" .  $this->db->escape($banner_image['image']) . "', setting = '" . $this->db->escape($banner_image['setting'])  . "', sort_order = '" . (int)$banner_image['sort_order'] . "'");
				}
			}
		}
	}

	public function deleteBanner($banner_id) {
		$this->db->query("DELETE FROM " . DB_PREFIX . "html_banner WHERE banner_id = '" . (int)$banner_id . "'");
		$this->db->query("DELETE FROM " . DB_PREFIX . "html_banner_image WHERE banner_id = '" . (int)$banner_id . "'");
	}

	public function getBanner($banner_id) {
		$query = $this->db->query("SELECT DISTINCT * FROM " . DB_PREFIX . "html_banner WHERE banner_id = '" . (int)$banner_id . "'");

		return $query->row;
	}

	public function getBanners($data = array()) {
		$sql = "SELECT * FROM " . DB_PREFIX . "html_banner";

		$sort_data = array(
			'name',
			'status'
		);

		if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
			$sql .= " ORDER BY " . $data['sort'];
		} else {
			$sql .= " ORDER BY name";
		}

		if (isset($data['order']) && ($data['order'] == 'DESC')) {
			$sql .= " DESC";
		} else {
			$sql .= " ASC";
		}

		if (isset($data['start']) || isset($data['limit'])) {
			if ($data['start'] < 0) {
				$data['start'] = 0;
			}

			if ($data['limit'] < 1) {
				$data['limit'] = 20;
			}

			$sql .= " LIMIT " . (int)$data['start'] . "," . (int)$data['limit'];
		}

		$query = $this->db->query($sql);

		return $query->rows;
	}

	public function getBannerImages($banner_id) {
		$banner_image_data = array();

		$banner_image_query = $this->db->query("SELECT * FROM " . DB_PREFIX . "html_banner_image WHERE banner_id = '" . (int)$banner_id . "' ORDER BY sort_order ASC");

		foreach ($banner_image_query->rows as $banner_image) {
			$banner_image_data[$banner_image['language_id']][] = array(
				'title'      => $banner_image['title'],
				'link'       => $banner_image['link'],
				'image'      => $banner_image['image'],
                'setting'    => $banner_image['setting'],
				'sort_order' => $banner_image['sort_order']
			);
		}

		return $banner_image_data;
	}

	public function getTotalBanners() {
		$query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "html_banner");

		return $query->row['total'];
	}
}
