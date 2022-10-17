
<?php
// Проверка на наличие и добавление доп.колонок в таблицу БД
class ControllerExtensionModuleInstallbd extends Controller {
	private $error = array();

	public function install() {
		$columns_data = array(
				'nav',
				'top',
		);
	foreach($columns_data as $column){
		$sql = $this->db->query("SELECT COUNT(COLUMN_NAME) FROM information_schema.COLUMNS WHERE TABLE_NAME = '".DB_PREFIX."information' AND COLUMN_NAME = '" . $column ."'");
		foreach ($sql->rows as $result) {
			if ($result["COUNT(COLUMN_NAME)"] == 0) {
				$this->db->query("ALTER TABLE `".DB_PREFIX."information` ADD COLUMN `" . $column . "` INT(1) NOT NULL DEFAULT '0' AFTER `bottom`");
			}
		}
	 }
	}
	public function uninstall() {
		$columns_data = array(
			'nav',
			'top',
		);
		foreach($columns_data as $column){
			$sql = $this->db->query("SELECT COUNT(COLUMN_NAME) FROM information_schema.COLUMNS WHERE TABLE_NAME = '".DB_PREFIX."information' AND COLUMN_NAME = '" . $column ."'");
				foreach ($sql->rows as $result) {
					if ($result["COUNT(COLUMN_NAME)"] == 1) {
						$this->db->query("ALTER TABLE `".DB_PREFIX."information` DROP COLUMN `" . $column . "`");
				  }
				}
		}
	}
}

								/* Добавление прав на управление модулем
								$this->load->model('user/user_group');
								$this->model_user_user_group->addPermission($this->user->getGroupId(),'access', 'module/instalbd');
								$this->model_user_user_group->addPermission($this->user->getGroupId(),'modify', 'module/instalbd');
								$settings['instalbd_status'] = 1;
								$this->model_setting_setting->editSetting('instalbd', $settings);*/


?>
