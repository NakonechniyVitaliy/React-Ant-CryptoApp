<?php

namespace App\Controller\Api;

use App\Entity\Asset;
use App\Entity\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ApiRegistrationController extends AbstractController
{

    #[Route('/api/registration', name: 'app_registration')]
    public function index(Request $request, EntityManagerInterface $em): Response
{
        $currentUser = $this->getUser();
        dump($currentUser);exit();

        $userAssets = $myUser->getAssets()->toArray();
        dump($userAssets);exit();


//        $asset = new Asset();
//        $asset->setPurchasePrice(25234.82);
//        $asset->setName('Solana');
//        $asset->setAbbreviation('SLN');
//        $asset->setUser($myUser);
//
//        $em->persist($asset);
//        $em->flush();


//        $user = new User();
//        $user->setEmail('user1@gmail.com');
//        $user->setPassword('userPassword123');
//
//        $em->persist($user);
//        $em->flush();

        return $this->render('registration/index.html.twig', [
            'controller_name' => 'RegistrationController',
        ]);
    }
}
