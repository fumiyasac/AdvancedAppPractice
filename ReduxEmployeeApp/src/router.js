/**
 * ルーティングの構築用ロジック
 */
import React from 'react';

//react-native-router-fluxライブラリのインポート宣言
// (ライブラリ概要)このライブラリのGithubリポジトリ
// https://github.com/aksonov/react-native-router-flux
// 基本的な用法：
// Routerタグで各々のSceneを囲む → Sceneにはkeyが設定されており「Actions.key_name()」で遷移する
import { Scene, Router, Actions } from 'react-native-router-flux';

//それぞれの表示用のコンポーネントのインポート宣言
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

//ルーティングロジック構築用のコンポーネントの内容を定義する
const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      { /* 1. Authentication Flow (認証用のフロー) */ }
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
      { /* 2. Main Flow (メインのフロー) */ }
      <Scene key="main">
        <Scene
          onRight={() => Actions.employeeCreate()}
          rightTitle="Add"
          key="employeeList"
          component={EmployeeList}
          title="Employees"
          initial
        />
        <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
        <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
      </Scene>
    </Router>
  );
};

//インポート可能にする宣言
export default RouterComponent;
